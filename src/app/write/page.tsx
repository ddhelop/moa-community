'use client';

import { useState, useEffect, useRef } from 'react';
import { XIcon, PlusIcon, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function WritePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [selectedBoard, setSelectedBoard] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [exitPath, setExitPath] = useState('/');
  const isFormValid = title.trim() && content.trim() && selectedBoard;

  // Check for changes
  useEffect(() => {
    if (title || content || selectedBoard || images.length > 0) {
      setHasChanges(true);
    }
  }, [title, content, selectedBoard, images]);

  // Add CSS to hide scrollbars but keep scroll functionality
  useEffect(() => {
    // Add custom scrollbar styling to hide scrollbars
    const style = document.createElement('style');
    style.textContent = `
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Hide board tabs and footer
  useEffect(() => {
    // Hide board tabs
    const boardTabs = document.querySelector('[data-component="board-tabs"]');
    if (boardTabs) {
      boardTabs.classList.add('hidden');
    }

    // Hide footer - using display:none for more reliable hiding
    const footer = document.querySelector('footer');
    if (footer) {
      footer.style.display = 'none';
    }

    return () => {
      if (boardTabs) {
        boardTabs.classList.remove('hidden');
      }
      if (footer) {
        footer.style.display = '';
      }
    };
  }, []);

  // Add beforeunload event listener for browser refresh/close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue =
          '변경사항이 저장되지 않을 수 있습니다. 정말 나가시겠습니까?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges]);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      // Prevent the default behavior
      e.preventDefault();

      if (hasChanges) {
        // Show the dialog
        setExitPath('/');
        setShowConfirmDialog(true);

        // Push a new state to the history to prevent going back
        // This ensures we stay on the current page
        window.history.pushState(null, '', window.location.pathname);
      }
    };

    // Add state to history so popstate can be triggered
    window.history.pushState(null, '', window.location.pathname);

    // Add event listener for popstate (triggered by browser back button)
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [hasChanges]);

  // Handle navigation within the app
  const handleNavigation = (path: string) => {
    if (hasChanges) {
      setExitPath(path);
      setShowConfirmDialog(true);
    } else {
      router.push(path);
    }
  };

  // Handle select board change
  const handleBoardChange = (value: string) => {
    setSelectedBoard(value);
  };

  // Function to trigger file input click
  const handleImageButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Function to handle actual file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);

      // Here we'd normally upload the files to a server and get back URLs
      // For this mock, we'll create object URLs
      const newImageUrls = newFiles.map((file) => URL.createObjectURL(file));

      // Add new images (up to maximum of 5 total)
      const updatedImages = [...images, ...newImageUrls].slice(0, 5);
      setImages(updatedImages);
    }
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Confirm exit without saving
  const confirmExit = () => {
    setShowConfirmDialog(false);
    router.push(exitPath);
  };

  // Cancel navigation
  const cancelExit = () => {
    setShowConfirmDialog(false);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('제목을 입력해주세요');
      return;
    }

    if (!selectedBoard) {
      toast.error('게시판을 선택해주세요');
      return;
    }

    if (!content.trim()) {
      toast.error('내용을 입력해주세요');
      return;
    }

    // Mock API call - in a real app, this would send data to the server
    toast.success('글이 등록되었습니다!');
    setHasChanges(false);

    // Redirect to the board
    setTimeout(() => {
      router.push('/board/' + selectedBoard);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 max-w-5xl h-[calc(100vh-65px)] overflow-hidden flex flex-col bg-white">
      <div className="pt-4">
        <button
          onClick={() => handleNavigation('/')}
          className="flex items-center text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span className="text-sm">뒤로가기</span>
        </button>
      </div>

      <form
        id="write-form"
        className="flex-grow py-4 space-y-6 overflow-y-auto hide-scrollbar"
        onSubmit={handleSubmit}
      >
        <div>
          <Select value={selectedBoard} onValueChange={handleBoardChange}>
            <SelectTrigger
              id="board"
              className="border border-gray-200 border-opacity-50 rounded-sm px-4 h-14 focus:ring-0 focus-visible:ring-0 shadow-none"
              style={{ fontSize: '13px' }}
            >
              <SelectValue placeholder="게시판을 선택해주세요" />
            </SelectTrigger>
            <SelectContent
              className="shadow-none border border-gray-200 rounded-sm"
              style={{ fontSize: '13px' }}
            >
              <SelectItem value="free">자유게시판</SelectItem>
              <SelectItem value="market">중고거래</SelectItem>
              <SelectItem value="local">지역소식</SelectItem>
              <SelectItem value="promo">홍보게시판</SelectItem>
              <SelectItem value="food">맛집게시판</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Input
            id="title"
            placeholder="제목을 입력하세요"
            className="border-0 border-b border-gray-100 rounded-none px-0 text-[30px] h-auto font-medium focus:ring-0 focus-visible:ring-0 placeholder:text-gray-300 shadow-none"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            maxLength={100}
            style={{ fontSize: '30px' }}
          />

          <Textarea
            id="content"
            placeholder="내용을 입력하세요"
            className="min-h-[240px] border-0 px-0 py-2 resize-none focus:ring-0 focus-visible:ring-0 placeholder:text-gray-300 text-base shadow-none bg-white"
            required
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />

          <div className="flex justify-end items-center pt-1 text-xs text-gray-400">
            <span>{content.length}자</span>
          </div>
        </div>

        <div className="pt-4 pb-16">
          {/* Image upload - show only a single plus button initially */}
          <div className="flex flex-wrap gap-2 mb-4">
            {/* Existing images */}
            {images.map((img, index) => (
              <div
                key={index}
                className="relative group h-24 w-24 overflow-hidden bg-white border border-gray-200 rounded-md"
              >
                <Image
                  src={img}
                  alt={`첨부 이미지 ${index + 1}`}
                  width={96}
                  height={96}
                  className="object-cover h-full w-full"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 h-5 w-5 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    setImages(images.filter((_, i) => i !== index));
                  }}
                >
                  <XIcon className="h-3 w-3 text-white" />
                </button>
              </div>
            ))}

            {/* Only show one plus button */}
            {images.length < 5 && (
              <div
                onClick={handleImageButtonClick}
                className="h-24 w-24 border border-dashed border-gray-200 rounded-md flex items-center justify-center text-gray-400 hover:text-gray-500 hover:border-gray-300 transition-colors cursor-pointer bg-gray-50"
              >
                <PlusIcon className="h-6 w-6" />
              </div>
            )}

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              multiple={images.length < 4} // Allow multiple selection only if we can accept more than one
            />
          </div>
        </div>
      </form>

      {/* Fixed bottom buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl py-3 flex justify-end items-center space-x-5">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="anonymous"
              checked={isAnonymous}
              onChange={() => setIsAnonymous(!isAnonymous)}
              className="rounded border-gray-300 h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <Label
              htmlFor="anonymous"
              className="font-normal text-sm text-gray-700"
            >
              익명
            </Label>
          </div>

          <Button
            type="submit"
            form="write-form"
            disabled={!isFormValid}
            className={`px-6 shadow-none ${
              isFormValid
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            등록하기
          </Button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md border rounded-md shadow-none">
          <DialogHeader>
            <DialogTitle>저장되지 않은 변경사항</DialogTitle>
            <DialogDescription>
              작성 중인 글이 있습니다. 저장하지 않고 나가시겠습니까?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              className="shadow-none"
              onClick={cancelExit}
            >
              취소
            </Button>
            <Button
              type="button"
              variant="default"
              className="bg-red-600 hover:bg-red-700 shadow-none"
              onClick={confirmExit}
            >
              확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
