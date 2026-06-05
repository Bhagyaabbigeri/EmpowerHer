import { useState, useEffect } from 'react';
import { ArrowLeft, Play, Shield, Clock, AlertTriangle, BookOpen, MapPin, Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type Technique = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: React.ReactNode;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  steps: string[];
  tips: string[];
  videoId?: string;
};

const techniques: Technique[] = [
  {
    id: 'basic-stance',
    title: 'Basic Stance & Awareness',
    description: 'Fundamental stance and situational awareness',
    longDescription: 'The foundation of all self-defense techniques. Learn how to position your body for optimal balance and power, and develop the awareness needed to avoid dangerous situations before they escalate.',
    icon: <Shield className="w-6 h-6 text-blue-600" />,
    difficulty: 'Beginner',
    duration: '5 min',
    steps: [
      'Stand with feet shoulder-width apart',
      'Keep your knees slightly bent',
      'Hands up in a protective position',
      'Weight evenly distributed',
      'Scan your environment continuously'
    ],
    tips: [
      'Practice this stance until it becomes second nature',
      'Be aware of exits and potential weapons in your environment',
      'Trust your instincts - if something feels wrong, leave'
    ],
    videoId: '3NycM9lYdOI'
  },
  {
    id: 'palm-strike',
    title: 'Palm Strike',
    description: 'Powerful open-hand strike technique',
    longDescription: 'A highly effective striking technique that uses the base of your palm to target vulnerable areas like the nose or chin, minimizing the risk of hand injuries.',
    icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
    difficulty: 'Beginner',
    duration: '7 min',
    steps: [
      'Start in the basic stance',
      'Keep fingers together and thumb tucked in',
      'Bend your wrist back slightly',
      'Aim for the nose or chin',
      'Follow through with your body weight'
    ],
    tips: [
      'Use your body weight, not just arm strength',
      'Aim for soft targets like the nose or throat',
      'Yell loudly when striking to startle the attacker'
    ],
    videoId: 'X6PtyfSk3hI'
  }
  // Add more techniques as needed
];

export default function SelfDefenseTechniquePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [savedTechniques, setSavedTechniques] = useState<string[]>([]);
  
  // Load saved techniques from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('savedTechniques');
    if (saved) {
      setSavedTechniques(JSON.parse(saved));
    }
  }, []);

  const currentIndex = techniques.findIndex(t => t.id === id);
  const technique = techniques[currentIndex] || techniques[0];
  const nextTechnique = currentIndex < techniques.length - 1 
    ? techniques[currentIndex + 1] 
    : techniques[0]; // Loop back to first technique if at the end
  const isSaved = savedTechniques.includes(technique.id);

  const toggleSaveTechnique = () => {
    let updatedSaved;
    if (isSaved) {
      updatedSaved = savedTechniques.filter(t => t !== technique.id);
      toast.success('Removed from saved techniques');
    } else {
      updatedSaved = [...savedTechniques, technique.id];
      toast.success('Saved for later');
    }
    setSavedTechniques(updatedSaved);
    localStorage.setItem('savedTechniques', JSON.stringify(updatedSaved));
  };

  const handleFindLocalClass = () => {
    // In a real app, this would open a map or redirect to a class finder
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        window.open(
          `https://www.google.com/maps/search/self+defense+class/@${latitude},${longitude},12z`,
          '_blank'
        );
      },
      (error) => {
        console.error('Error getting location:', error);
        window.open('https://www.google.com/search?q=self+defense+classes+near+me', '_blank');
      }
    );
  };

  if (!technique) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Technique Not Found</h1>
        <p className="mb-6">The requested self-defense technique could not be found.</p>
        <Button asChild>
          <Link to="/self-defense">Back to Self-Defense</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Techniques
      </Button>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:w-2/3 p-6 md:p-8">
            <div className="flex items-center mb-2">
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                technique.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                technique.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-800' :
                'bg-red-100 text-red-800'
              }`}>
                {technique.difficulty}
              </span>
              <span className="ml-3 text-sm text-gray-500 flex items-center">
                <Clock className="h-4 w-4 mr-1" /> {technique.duration}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{technique.title}</h1>
            <p className="text-lg text-gray-700 mb-6">{technique.longDescription}</p>
            
            <div className="flex space-x-4 mb-8">
              <Button 
                className="px-6"
                onClick={() => {
                  setIsVideoPlaying(true);
                  // Scroll to video section
                  document.getElementById('video-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Play className="mr-2 h-4 w-4" /> Watch Video
              </Button>
              <Button 
                variant={isSaved ? 'default' : 'outline'} 
                onClick={toggleSaveTechnique}
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="mr-2 h-4 w-4" /> Saved
                  </>
                ) : (
                  <>
                    <BookOpen className="mr-2 h-4 w-4" /> Save for Later
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Steps to Perform</h3>
                <ol className="space-y-2">
                  {technique.steps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex items-center justify-center bg-blue-100 text-blue-600 rounded-full h-6 w-6 text-sm font-medium mr-3 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {technique.tips && technique.tips.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-3">Pro Tips</h3>
                  <ul className="space-y-2">
                    {technique.tips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-amber-500 mr-2 mt-1">•</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          <div id="video-section" className="md:w-1/3 bg-gray-50 p-6 flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
                {isVideoPlaying ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${technique.videoId}?autoplay=1`}
                    title={technique.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center bg-gray-200 cursor-pointer"
                    onClick={() => setIsVideoPlaying(true)}
                  >
                    <div className="text-center">
                      <div className="bg-red-600 text-white rounded-full p-4 inline-block mb-2 hover:bg-red-700 transition-colors">
                        <Play className="h-8 w-8" />
                      </div>
                      <p className="text-sm text-gray-600">Click to play video tutorial</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2">Safety First</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Always practice these techniques with a partner in a safe environment under proper supervision.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={handleFindLocalClass}
                >
                  <MapPin className="mr-2 h-4 w-4" /> Find a Local Class
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Ready to learn more?</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline" asChild>
            <Link to="/self-defense">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Techniques
            </Link>
          </Button>
          <Button asChild>
            <Link 
              to={`/self-defense/${nextTechnique.id}`}
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
              onClick={(e) => {
                e.preventDefault();
                setIsVideoPlaying(false);
                window.scrollTo(0, 0);
                // Use navigate to ensure proper route handling
                navigate(`/self-defense/${nextTechnique.id}`);
              }}
            >
              {nextTechnique ? 'Next: ' + nextTechnique.title : 'Back to Start'} 
              <ArrowLeft className="ml-2 h-4 w-4 transform rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
