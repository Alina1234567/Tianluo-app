-- ============================================================
-- 灵凌同学 (Lingling AI) - Supabase / PostgreSQL 生产数据库脚本
-- ============================================================

-- 1. 用户档案表 (扩展 Supabase auth.users 或独立使用)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone VARCHAR(20) UNIQUE,
  nickname VARCHAR(50) DEFAULT '新创作者',
  avatar_url TEXT DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  role VARCHAR(20) DEFAULT 'user', -- 'user', 'vip', 'admin'
  credits INT DEFAULT 50, -- 注册赠送 50 积分
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 套餐与价格表
CREATE TABLE IF NOT EXISTS public.packages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  credits INT NOT NULL,
  tag VARCHAR(30), -- '最受欢迎', '特惠', '高性价比'
  description TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 充值订单表
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_no VARCHAR(64) UNIQUE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  package_id INT REFERENCES public.packages(id),
  amount DECIMAL(10, 2) NOT NULL,
  credits INT NOT NULL,
  pay_type VARCHAR(20) DEFAULT 'wechat', -- 'wechat', 'alipay'
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'paid', 'cancelled'
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. 积分变动明细表 (审计与防作弊)
CREATE TABLE IF NOT EXISTS public.credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount INT NOT NULL, -- 正数增加，负数扣除
  balance_after INT NOT NULL,
  type VARCHAR(30) NOT NULL, -- 'signup_bonus', 'recharge', 'task_cost', 'admin_adjust'
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. 小红书灵感与创作模板表 (CMS 管理)
CREATE TABLE IF NOT EXISTS public.templates (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL, -- '爆款标题', '知识科普', 'IP形象', '卡通工坊', '自由创作'
  description TEXT,
  cover_url TEXT,
  prompt_template TEXT NOT NULL,
  cost_credits INT DEFAULT 2,
  heat_count INT DEFAULT 1200,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. 创作任务与生成记录表
CREATE TABLE IF NOT EXISTS public.generation_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  template_id INT REFERENCES public.templates(id),
  task_type VARCHAR(50) NOT NULL,
  input_params JSONB NOT NULL DEFAULT '{}'::jsonb,
  output_content TEXT,
  output_images JSONB DEFAULT '[]'::jsonb,
  status VARCHAR(20) DEFAULT 'completed', -- 'queued', 'processing', 'completed', 'failed'
  cost_credits INT DEFAULT 2,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. AI 模型调度与渠道管理表 (路由、并发、切站)
CREATE TABLE IF NOT EXISTS public.model_channels (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  channel_type VARCHAR(20) NOT NULL, -- 'text', 'image'
  provider VARCHAR(50) NOT NULL, -- 'deepseek', 'openai', 'midjourney', 'flux'
  model_name VARCHAR(100) NOT NULL,
  api_endpoint TEXT NOT NULL,
  api_key TEXT,
  priority INT DEFAULT 1,
  max_concurrency INT DEFAULT 10,
  is_active BOOLEAN DEFAULT TRUE,
  failover_target INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. 系统公告表
CREATE TABLE IF NOT EXISTS public.announcements (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 预置初始业务数据 (Seed Data)
-- ============================================================

-- 预置套餐
INSERT INTO public.packages (name, price, original_price, credits, tag, description, sort_order) VALUES
('体验包', 9.90, 19.90, 100, '新手必选', '包含 100 积分，可生成 50 篇爆款小红书图文', 1),
('月度畅享卡', 49.00, 99.00, 600, '最受欢迎', '包含 600 积分 + 优先生成通道 + 专属提示词库', 2),
('年度创作者 Pro', 299.00, 599.00, 4500, '高性价比', '包含 4500 积分 + 所有新功能抢先试用 + 专属客服支持', 3)
ON CONFLICT DO NOTHING;

-- 预置模板
INSERT INTO public.templates (title, category, description, prompt_template, cost_credits, heat_count, cover_url) VALUES
('小红书情绪共鸣爆款标题', '爆款标题', '提炼吸睛痛点，激发点击与互动欲望', '请根据以下主题生成 10 个符合小红书风格的爆款标题，包含表情符号与情绪唤起词：{topic}', 1, 9820, 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80'),
('极简知识卡片图文排版', '知识科普', '清晰视觉层级，适合干货教程与好物种草', '请将以下干货内容整理为小红书图文卡片大纲，分为引言、3个核心观点及金句总结：{topic}', 2, 8430, 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=500&q=80'),
('暖心治愈系卡通插画 IP', '卡通工坊', '打造有辨识度的自媒体拟人 IP', '卡通治愈系插画，柔和暖色调，简约扁平风格，小红书配图风格：{topic}', 5, 12400, 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=500&q=80'),
('痛点型种草脚本生成器', '自由创作', '3秒抓人黄金前3秒文案与分镜建议', '以小红书第一人称视角撰写一篇痛点种草脚本，包含痛点切入、解决方案与行动呼吁：{topic}', 2, 7200, 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=500&q=80')
ON CONFLICT DO NOTHING;

-- 预置模型通道
INSERT INTO public.model_channels (name, channel_type, provider, model_name, api_endpoint, priority, is_active) VALUES
('主线-DeepSeek V3 高速文案', 'text', 'deepseek', 'deepseek-chat', 'https://api.deepseek.com/v1', 1, true),
('备用-通义千问 商业版', 'text', 'aliyun', 'qwen-max', 'https://dashscope.aliyuncs.com/api/v1', 2, true),
('主线-Flux 极致质感生图', 'image', 'flux', 'flux-1-schnell', 'https://api.bfl.ml/v1', 1, true)
ON CONFLICT DO NOTHING;

-- 预置系统公告
INSERT INTO public.announcements (title, content, is_pinned) VALUES
('灵凌同学 V2.6 全新上线', '全新小红书爆款标题生成器与卡通工坊已开放使用，新注册用户赠送 50 初始积分！', true)
ON CONFLICT DO NOTHING;
