import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

import { TextBox } from '../components/TextBox';
import { OutputBox } from '../components/OutputBox';
import { ButtonBox } from '../components/ButtonBox';
import { TitleModal } from '../components/TitleModal';
import { saveText } from '../services/textService';

// Type for the output value state
interface ValueState {
  WORDS: number;
  CHARACTERS: number;
  SENTENCES: number;
  PARAGRAPHS: number;
}

export function Home() {

  const userIsLogged = useSelector((state: any) => state.auth.isLoggedIn);

  const [text, setText] = useState<string>('');
  const [value, setValue] = useState<ValueState>({
    WORDS: 0,
    CHARACTERS: 0,
    SENTENCES: 0,
    PARAGRAPHS: 0,
  });

  const [showTitleModal, setShowTitleModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');


  // Function to calculate word, character, sentence, and paragraph counts
  const calculateCounts = (inputText: string) => {
    const words = inputText.trim() === "" ? 0 : inputText.trim().split(/\s+/).length;
    const characters = inputText.length;
    const sentences = inputText.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = inputText.trim() === "" ? 0 : inputText.split(/\n+/).filter(Boolean).length;

    setValue({
      WORDS: words,
      CHARACTERS: characters,
      SENTENCES: sentences,
      PARAGRAPHS: paragraphs,
    });
  };

  // useEffect to recalculate counts whenever text changes
  useEffect(() => {
    calculateCounts(text);
  }, [text]);

  const handleSaveClick = () => {
    if (!userIsLogged) {
      toast.error("You are not logged in. Please log in to save your work.");
      return;
    }
    setShowTitleModal(true);
  };

  return (
    <div className="p-4 w-full max-w-[70%] h-[70vh] bg-gray-100 rounded-lg shadow-lg mx-auto mt-12 overflow-y-auto">
      {/* Output Section */}
      <OutputBox value={value} />

      {/* Buttons and TextArea Section */}
      <div className="flex gap-4 h-[75%]">
        <ButtonBox onSaveClick={handleSaveClick} />
        <div className="flex-1">
          <TextBox text={text} setText={setText} />
        </div>
      </div>

      {showTitleModal && (
        <TitleModal
          title={title}
          setTitle={setTitle}
          saveText={async () => {
            try {
              await saveText({ title, description: text });
              setShowTitleModal(false);
            } catch (err: any) {
              toast.error("Failed to save text. Please try again.");
              console.error(err)
            }
          }}
          setShowTitleModal={setShowTitleModal}
        />
      )}
    </div>
  );
}
