import { Shield, Play, BookOpen, Zap, Target, ShieldCheck, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

type Technique = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  videoId?: string;
};

const techniques: Technique[] = [
  {
    id: 'basic-stance',
    title: 'Basic Stance & Awareness',
    description: 'Learn the fundamental stance and how to be aware of your surroundings.',
    icon: <Shield className="w-6 h-6 text-blue-600" />,
    difficulty: 'Beginner',
    duration: '5 min',
    videoId: '3NycM9lYdOI'
  },
  {
    id: 'palm-strike',
    title: 'Palm Strike',
    description: 'Powerful open-hand strike to the nose or chin of an attacker.',
    icon: <Target className="w-6 h-6 text-red-600" />,
    difficulty: 'Beginner',
    duration: '7 min',
    videoId: 'X6PtyfSk3hI'
  },
  {
    id: 'wrist-release',
    title: 'Wrist Release',
    description: 'Escape from a wrist grab using leverage and technique.',
    icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
    difficulty: 'Intermediate',
    duration: '8 min',
    videoId: '7vG6s3y8X0Y'
  },
  {
    id: 'ground-defense',
    title: 'Ground Defense',
    description: 'Essential techniques to defend yourself when on the ground.',
    icon: <Zap className="w-6 h-6 text-amber-600" />,
    difficulty: 'Advanced',
    duration: '10 min',
    videoId: '9C1TSC0Xw3Y'
  }
];

export default function SelfDefensePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Self-Defense</h1>
        <p className="text-xl text-gray-600">Learn essential self-defense techniques to protect yourself</p>
      </div>

      <div className="max-w-md mx-auto mb-12">
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Self-Defense Training</h3>
          <p className="text-gray-600 mb-4">Master essential techniques to protect yourself in various situations.</p>
          <Button asChild className="w-full">
            <Link to="/self-defense/techniques">
              Start Learning <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Card>
      </div>

      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Techniques</h2>
          <Button variant="ghost" asChild>
            <Link to="/self-defense/techniques" className="text-primary">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techniques.map((technique) => (
            <Card key={technique.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-600">
                <div className="bg-white p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-lg bg-gray-100">
                      {technique.icon}
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      technique.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                      technique.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {technique.difficulty}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{technique.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{technique.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{technique.duration}</span>
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/self-defense/${technique.id}`}>
                        <Play className="h-4 w-4 mr-1" /> Watch
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 p-8 rounded-xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Safe, Stay Confident</h2>
          <p className="text-gray-600 mb-6">
            Our self-defense program is designed to empower you with practical skills and confidence. 
            Learn at your own pace and practice safely with our expert-guided tutorials.
          </p>
          <Button size="lg" className="px-8">
            Get Started with Self-Defense
          </Button>
        </div>
      </div>
    </div>
  );
}
