import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Document, Page, Text, pdf, View } from '@react-pdf/renderer';
import pdfToText from 'react-pdftotext'


import { TextBox } from '../components/TextBox';
import { OutputBox } from '../components/OutputBox';
import { ButtonBox } from '../components/ButtonBox';
import { TitleModal } from '../components/TitleModal';
import { saveText, getText, UpdateText } from '../services/textService';

// Type for the output value state
interface ValueState {
  WORDS: number;
  CHARACTERS: number;
  SENTENCES: number;
  PARAGRAPHS: number;
}

export function Home() {

  const navigate = useNavigate()

  const userIsLogged = useSelector((state: any) => state.auth.isLoggedIn);

  const [description, setDescription] = useState<string>('');
  const [value, setValue] = useState<ValueState>({
    WORDS: 0,
    CHARACTERS: 0,
    SENTENCES: 0,
    PARAGRAPHS: 0,
  });

  const [showTitleModal, setShowTitleModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);


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
    calculateCounts(description);
  }, [description]);

  const handleSaveClick = () => {
    if (!userIsLogged) {
      toast.error("You are not logged in. Please log in to save your work.");
      return;
    }
    setShowTitleModal(true);
  };

  // get text ----
  const { textId } = useParams<{ textId: string }>();

  useEffect(() => {
    console.log('Current textId:', textId);
    const fetchText = async () => {
      if (textId) {
        const result = await getText({ id: parseInt(textId) });
        if (result) {
          setTitle(result.title);
          setDescription(result.description);
          setIsUpdating(true);
        } else {
          toast.error('Failed to fetch the text details.');
        }
      }
    };

    fetchText();
  }, [textId]);

  // clear title and description
  const handleClearClick = () => {
    setDescription('')
    toast.success('Text and title cleared.');
  };

  // Function to handle save
  const handleSave = async () => {
    const response = await saveText({ title, description });
    if (response && response.textId) {
      setShowTitleModal(false);
      navigate(`/${response.textId}`);
    }
  };

  // Function to handle update
  const handleUpdate = async () => {
    if (textId) {
      await UpdateText({ id: parseInt(textId), title, description });
      setShowTitleModal(false);
    }
  };

  // function to create pdf
  const handleDownloadClick = async () => {
    const doc = (
      <Document>
        <Page size="A4" style={{ paddingBottom: 30 }}> {/* Ensure bottom padding */}
          <View style={{ padding: 20, flexGrow: 1 }}> {/* Adjust View for spacing */}
            <Text>{description}</Text>
          </View>
        </Page>
      </Document>
    );

    const blob = await pdf(doc).toBlob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'document.pdf';
    link.click();
  };

  // function to extract text
  const handleExtractText = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      toast.error('No file selected');
      return;
    }
  
    try {
      const extractedText = await pdfToText(file);
      if (!extractedText || extractedText.trim().length === 0) {
        toast.error('No text content found in the PDF');
        return;
      }
      setDescription(extractedText)
      toast.success('Text extracted successfully from PDF');  
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      if (error instanceof Error) {
        toast.error(`Failed to extract text: ${error.message}`);
      } else {
        toast.error('Failed to extract text from PDF');
      }
    }
    event.target.value = '';
  };

  return (
    <div className="p-4 w-full max-w-[70%] h-[70vh] bg-gray-100 rounded-lg shadow-lg mx-auto mt-12 overflow-y-auto">
      {/* Output Section */}
      <OutputBox value={value} />

      {/* Buttons and TextArea Section */}
      <div className="flex gap-4 h-[75%]">
        <ButtonBox onSaveClick={handleSaveClick} onClearClick={handleClearClick} onDownloadClick={handleDownloadClick} onExtractText={handleExtractText} textId={textId ? parseInt(textId) : null} />
        <div className="flex-1">
          <TextBox text={description} setText={setDescription} />
        </div>
      </div>

      {showTitleModal && (
        <TitleModal
          title={title}
          setTitle={setTitle}
          onSave={isUpdating ? handleUpdate : handleSave} // Conditional onSave handler
          onClose={() => setShowTitleModal(false)}
          isUpdating={isUpdating}
        />
      )}
    </div>
  );
}
