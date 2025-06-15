
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Star, Shield, Lock } from 'lucide-react';

interface AchievementSystemProps {
  achievements: string[];
  xp: number;
}

const AchievementSystem: React.FC<AchievementSystemProps> = ({ achievements, xp }) => {
  const allAchievements = [
    {
      id: 'first-upgrade',
      name: 'Primera Mejora',
      description: 'Alcanzaste el nivel intermedio',
      icon: Shield,
      color: 'from-blue-500 to-cyan-500',
      xp: 50
    },
    {
      id: 'security-master',
      name: 'Maestro de Seguridad',
      description: 'Lograste una contraseña avanzada',
      icon: Star,
      color: 'from-green-500 to-emerald-500',
      xp: 100
    },
    {
      id: 'password-expert',
      name: 'Experto en Contraseñas',
      description: '¡Contraseña de nivel experto!',
      icon: Award,
      color: 'from-purple-500 to-pink-500',
      xp: 200
    },
    {
      id: 'length-champion',
      name: 'Campeón de Longitud',
      description: 'Creaste una contraseña de 20+ caracteres',
      icon: Lock,
      color: 'from-yellow-500 to-orange-500',
      xp: 150
    }
  ];

  const getXPLevel = () => {
    if (xp >= 500) return { level: 5, title: 'Leyenda Cibernética', nextLevelXP: 1000 };
    if (xp >= 300) return { level: 4, title: 'Guardián Élite', nextLevelXP: 500 };
    if (xp >= 150) return { level: 3, title: 'Especialista', nextLevelXP: 300 };
    if (xp >= 50) return { level: 2, title: 'Aprendiz', nextLevelXP: 150 };
    return { level: 1, title: 'Novato', nextLevelXP: 50 };
  };

  const playerLevel = getXPLevel();
  const progressToNext = ((xp - (playerLevel.level === 1 ? 0 : playerLevel.level === 2 ? 50 : playerLevel.level === 3 ? 150 : 300)) / (playerLevel.nextLevelXP - (playerLevel.level === 1 ? 0 : playerLevel.level === 2 ? 50 : playerLevel.level === 3 ? 150 : 300))) * 100;

  return (
    <div className="space-y-6">
      {/* Player Level Card */}
      <Card className="p-6 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 backdrop-blur-sm border-purple-500/30">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white">Nivel {playerLevel.level}</h3>
              <p className="text-purple-300 text-lg">{playerLevel.title}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-yellow-400">{xp} XP</div>
              <div className="text-sm text-gray-300">
                Siguiente: {playerLevel.nextLevelXP} XP
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-300">
              <span>Progreso al siguiente nivel</span>
              <span>{Math.round(progressToNext)}%</span>
            </div>
            <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
                style={{ width: `${Math.min(progressToNext, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Achievements Grid */}
      <Card className="p-6 bg-black/20 backdrop-blur-sm border-cyan-500/30">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
          <Award className="w-6 h-6 text-yellow-400" />
          <span>Logros Desbloqueados</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allAchievements.map((achievement) => {
            const isUnlocked = achievements.includes(achievement.id);
            const IconComponent = achievement.icon;
            
            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  isUnlocked 
                    ? 'bg-gradient-to-r from-gray-800 to-gray-900 border-yellow-400 shadow-lg shadow-yellow-400/20' 
                    : 'bg-gray-800/30 border-gray-600 opacity-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center ${
                    isUnlocked ? 'animate-pulse' : 'grayscale'
                  }`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className={`font-semibold ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>
                      {achievement.name}
                    </h4>
                    <p className={`text-sm ${isUnlocked ? 'text-gray-300' : 'text-gray-500'}`}>
                      {achievement.description}
                    </p>
                    <Badge 
                      variant="secondary" 
                      className={`mt-1 ${isUnlocked ? 'bg-yellow-500 text-black' : 'bg-gray-600'}`}
                    >
                      +{achievement.xp} XP
                    </Badge>
                  </div>
                  
                  {isUnlocked && (
                    <div className="text-green-400 text-2xl animate-bounce">✨</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {achievements.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <Lock className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>¡Genera tu primera contraseña para desbloquear logros!</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AchievementSystem;
