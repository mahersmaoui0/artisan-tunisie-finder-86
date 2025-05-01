
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MessageCircle, Send, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: string;
  content: string;
  isUser: boolean;
};

type AssistantState = 'greeting' | 'services' | 'pricing' | 'quote' | 'contact' | 'transfer';

export function VirtualAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [state, setState] = useState<AssistantState>('greeting');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initial greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            id: "1",
            content: "Marhba bik! 👋 Je suis Anis, votre assistant virtuel. Comment puis-je vous aider aujourd'hui ? Je peux vous informer sur nos artisans, services, tarifs ou vous aider à demander un devis.",
            isUser: false,
          },
        ]);
      }, 500);
    }
  }, [isOpen, messages]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const userMessageLower = userMessage.toLowerCase();
    
    // Detect intent from user message
    if (userMessageLower.includes('prix') || userMessageLower.includes('tarif') || userMessageLower.includes('coût')) {
      setState('pricing');
      return "Les prix varient selon le type d'artisan et le service demandé. Par exemple, nos plombiers commencent à partir de 30 dinars/heure, les électriciens à partir de 35 dinars/heure. Souhaitez-vous connaître les tarifs d'un service spécifique ?";
    }
    
    if (userMessageLower.includes('service') || userMessageLower.includes('artisan') || userMessageLower.includes('travail')) {
      setState('services');
      return "ArtisanTunisie vous propose des artisans qualifiés dans plusieurs domaines: plomberie, électricité, menuiserie, peinture, maçonnerie, jardinage et nettoyage. Y a-t-il un domaine particulier qui vous intéresse ?";
    }
    
    if (userMessageLower.includes('devis') || userMessageLower.includes('estim') || userMessageLower.includes('reservation')) {
      setState('quote');
      return "Pour obtenir un devis personnalisé, je peux vous aider à remplir un formulaire rapide. Pouvez-vous me préciser le type de service dont vous avez besoin ?";
    }
    
    if (userMessageLower.includes('parler') || userMessageLower.includes('humain') || userMessageLower.includes('conseiller')) {
      setState('transfer');
      return "Je comprends que vous souhaitiez parler à un conseiller. Je vais transférer votre demande. Un membre de notre équipe vous contactera très prochainement. Pouvez-vous me laisser votre numéro de téléphone ?";
    }
    
    // Default responses based on current state
    switch(state) {
      case 'greeting':
        setState('services');
        return "Je serais ravi de vous présenter nos services. ArtisanTunisie met en relation des clients comme vous avec des artisans qualifiés en plomberie, électricité, menuiserie et plusieurs autres domaines. Quel type de service recherchez-vous ?";
      
      case 'services':
        setState('pricing');
        return "Excellent choix ! Nous avons plusieurs artisans disponibles dans ce domaine. Les tarifs varient selon la complexité du travail. Souhaitez-vous connaître les prix ou préférez-vous demander un devis personnalisé ?";
      
      case 'pricing':
        setState('quote');
        return "Pour vous offrir un service parfaitement adapté, je vous propose de demander un devis. Ainsi, l'artisan pourra vous proposer un prix juste selon vos besoins spécifiques. Souhaitez-vous que je vous aide à remplir un formulaire de demande de devis ?";
      
      case 'quote':
        setState('contact');
        return "Merci pour ces informations. Pour finaliser votre demande de devis, pouvez-vous me laisser un numéro de téléphone où l'artisan pourra vous contacter ?";
      
      case 'contact':
      case 'transfer':
        return "Parfait ! Un de nos artisans vous contactera très prochainement au numéro indiqué. Y a-t-il autre chose que je puisse faire pour vous aider en attendant ?";
      
      default:
        return "Je n'ai pas bien compris votre demande. Puis-je vous aider concernant nos services, nos tarifs ou pour demander un devis ?";
    }
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Generate assistant response after a short delay
    setTimeout(() => {
      const response = generateResponse(userMessage.content);
      
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), content: response, isUser: false },
      ]);
      
      // If in transfer state, show toast notification
      if (state === 'transfer') {
        toast({
          title: "Transfert en cours",
          description: "Un conseiller va vous contacter très bientôt.",
        });
      }
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            className="h-14 w-14 rounded-full bg-tunisian-terracotta hover:bg-tunisian-terracotta/90"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <MessageCircle className="h-6 w-6" />}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[350px] sm:w-[400px] h-[500px] flex flex-col p-0 border-2"
          align="end"
        >
          <div className="bg-tunisian-terracotta text-white p-3 flex justify-between items-center rounded-t">
            <h3 className="font-medium">Assistant ArtisanTunisie</h3>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-white hover:bg-tunisian-terracotta/90"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.isUser
                      ? "bg-tunisian-blue text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Tapez votre message ici..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1"
              />
              <Button 
                size="icon"
                onClick={handleSend}
                className="bg-tunisian-blue hover:bg-tunisian-blue/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
