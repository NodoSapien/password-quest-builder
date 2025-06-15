
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Shield, Star, Award } from 'lucide-react';

interface SecurityLevelsProps {
  currentLevel: number;
  onGeneratePassword: (level: number) => void;
}

const SecurityLevels: React.FC<SecurityLevelsProps> = ({ currentLevel, onGeneratePassword }) => {
  const levels = [
    {
      id: 1,
      name: 'Principiante',
      icon: Lock,
      color: 'from-red-500 to-pink-500',
      requirements: '8 caracteres, solo letras',
      reward: '+10 XP',
      description: 'Tu primer paso hacia la seguridad'
    },
    {
      id: 2,
      name: 'Guerrero',
      icon: Shield,
      color: 'from-yellow-500 to-orange-500',
      requirements: '10 caracteres, letras y números',
      reward: '+25 XP',
      description: 'Proteges tus datos como un guerrero'
    },
    {
      id: 3,
      name: 'Guardián',
      icon: Star,
      color: 'from-green-500 to-emerald-500',
      requirements: '12 caracteres, letras, números y símbolos',
      reward: '+50 XP',
      description: 'Guardian élite de la ciberseguridad'
    },
    {
      id: 4,
      name: 'Maestro',
      icon: Award,
      color: 'from-purple-500 via-blue-500 to-cyan-500',
      requirements: '16+ caracteres, combinación completa',
      reward: '+100 XP',
      description: '🏆 ¡Maestro absoluto de contraseñas!'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {levels.map((level) => {
        const IconComponent = level.icon;
        const isUnlocked = currentLevel >= level.id;
        const isCurrent = currentLevel === level.id;

        return (
          <Card 
            key={level.id}
            className={`p-4 transition-all duration-300 hover:scale-105 ${
              isCurrent 
                ? 'bg-gradient-to-br from-blue-600/40 to-purple-600/40 border-cyan-400 border-2' 
                : isUnlocked 
                  ? 'bg-black/30 border-green-500/50' 
                  : 'bg-black/20 border-gray-600/30'
            } backdrop-blur-sm`}
          >
            <div className="text-center space-y-3">
              {/* Level Icon */}
              <div className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-r ${level.color} flex items-center justify-center ${
                isUnlocked ? 'animate-pulse' : 'grayscale opacity-50'
              }`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>

              {/* Level Info */}
              <div>
                <h3 className={`font-bold text-lg ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>
                  Nivel {level.id}: {level.name}
                </h3>
                <p className={`text-sm ${isUnlocked ? 'text-blue-200' : 'text-gray-500'}`}>
                  {level.requirements}
                </p>
              </div>

              {/* Reward Badge */}
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                isUnlocked 
                  ? 'bg-yellow-500 text-black' 
                  : 'bg-gray-600 text-gray-300'
              }`}>
                {level.reward}
              </div>

              {/* Description */}
              <p className={`text-xs ${isUnlocked ? 'text-cyan-300' : 'text-gray-500'}`}>
                {level.description}
              </p>

              {/* Generate Button */}
              <Button
                onClick={() => onGeneratePassword(level.id)}
                className={`w-full ${
                  isCurrent 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700' 
                    : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600'
                }`}
              >
                {isCurrent ? '⚡ Activo' : 'Generar'}
              </Button>

              {/* Level Status */}
              {isCurrent && (
                <div className="text-green-400 text-xs font-semibold animate-bounce">
                  ✨ ¡Nivel Actual!
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default SecurityLevels;
