-- 게시판 목록 테이블
CREATE TABLE boards (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  is_system BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 게시글 테이블
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  board_id INTEGER REFERENCES boards(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_nickname VARCHAR(100) NOT NULL,
  is_anonymous BOOLEAN DEFAULT FALSE,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 댓글 테이블
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  author_nickname VARCHAR(100) NOT NULL,
  is_anonymous BOOLEAN DEFAULT FALSE,
  likes_count INTEGER DEFAULT 0,
  parent_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 좋아요 테이블
CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  comment_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
  user_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT check_target_xor CHECK (
    (post_id IS NULL AND comment_id IS NOT NULL) OR
    (post_id IS NOT NULL AND comment_id IS NULL)
  ),
  UNIQUE(post_id, user_id, comment_id)
);

-- 기본 게시판 데이터 추가
INSERT INTO boards (name, slug, description, icon, is_system) VALUES
  ('핫게시판', 'hot', '인기있는 게시글 모음', '🔥', TRUE),
  ('자유게시판', 'free', '아무 말이나 가능, 일상/잡담', '💬', TRUE),
  ('홍보게시판', 'promo', '소상공인/알바/행사 등 자유 홍보 가능', '📢', TRUE),
  ('지역소식', 'local', '마포구 내 현장 소식, 민원, 뉴스 등', '📍', TRUE),
  ('게시판 요청', 'request', '사용자들이 게시판 개설 요청 가능', '➕', TRUE);

-- 인덱스 생성
CREATE INDEX idx_posts_board_id ON posts(board_id);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_likes_post_id ON likes(post_id);
CREATE INDEX idx_likes_comment_id ON likes(comment_id); 