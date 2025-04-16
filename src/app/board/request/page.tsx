import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const metadata = {
  title: '게시판 요청 - 마포동네',
  description: '마포동네에 새로운 게시판을 요청하세요',
};

export default function RequestBoardPage() {
  return (
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">게시판 요청</h1>
        <p className="text-gray-600 text-sm mt-1">
          새로운 게시판 개설을 요청하세요. 운영자 검토 후 승인됩니다.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>게시판 개설 요청</CardTitle>
          <CardDescription>원하는 게시판 정보를 작성해주세요</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="boardName" className="text-sm font-medium">
                게시판 이름
              </label>
              <Input id="boardName" placeholder="예: 마포구 맛집, 육아 정보" />
            </div>

            <div className="space-y-2">
              <label htmlFor="boardDescription" className="text-sm font-medium">
                게시판 설명
              </label>
              <Textarea
                id="boardDescription"
                placeholder="이 게시판은 어떤 주제를 다루나요?"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="boardIcon" className="text-sm font-medium">
                게시판 아이콘 (이모지)
              </label>
              <Input id="boardIcon" placeholder="예: 🍕, 👶" />
            </div>

            <div className="space-y-2">
              <label htmlFor="boardReason" className="text-sm font-medium">
                개설 사유
              </label>
              <Textarea
                id="boardReason"
                placeholder="이 게시판이 필요한 이유를 설명해주세요"
              />
            </div>

            <Button type="submit" className="w-full">
              요청하기
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
