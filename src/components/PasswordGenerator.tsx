
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Award, Star, Lock } from 'lucide-react';
import PasswordStrengthBar from './PasswordStrengthBar';
import SecurityLevels from './SecurityLevels';
import AchievementSystem from './AchievementSystem';
import PasswordTips from './PasswordTips';

interface PasswordStats {
  length: number;
  hasLower: boolean;
  hasUpper: boolean;
  hasNumbers: boolean;
  hasSymbols: boolean;
  level: number;
  score: number;
}

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [xp, setXp] = useState(0);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showCelebration, setShowCelebration] = useState(false);

  const calculatePasswordStats = (pwd: string): PasswordStats => {
    const stats = {
      length: pwd.length,
      hasLower: /[a-z]/.test(pwd),
      hasUpper: /[A-Z]/.test(pwd),
      hasNumbers: /\d/.test(pwd),
      hasSymbols: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
      level: 1,
      score: 0
    };

    // Calculate level based on requirements
    if (stats.length >= 8 && (stats.hasLower || stats.hasUpper)) {
      stats.level = 1;
      stats.score = 25;
    }
    if (stats.length >= 10 && stats.hasLower && stats.hasNumbers) {
      stats.level = 2;
      stats.score = 50;
    }
    if (stats.length >= 12 && stats.hasLower && stats.hasUpper && stats.hasNumbers && stats.hasSymbols) {
      stats.level = 3;
      stats.score = 75;
    }
    if (stats.length >= 16 && stats.hasLower && stats.hasUpper && stats.hasNumbers && stats.hasSymbols) {
      stats.level = 4;
      stats.score = 100;
    }

    return stats;
  };

  const generatePassword = (level: number) => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    let minLength = 8;
    let newPassword = '';

    switch (level) {
      case 1:
        chars = lowercase;
        minLength = 8;
        break;
      case 2:
        chars = lowercase + numbers;
        minLength = 10;
        break;
      case 3:
        chars = lowercase + uppercase + numbers + symbols;
        minLength = 12;
        break;
      case 4:
        chars = lowercase + uppercase + numbers + symbols;
        minLength = 16;
        break;
    }

    for (let i = 0; i < minLength; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Ensure requirements are met for higher levels
    if (level >= 2 && !/\d/.test(newPassword)) {
      newPassword = newPassword.slice(0, -1) + numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    if (level >= 3) {
      if (!/[A-Z]/.test(newPassword)) {
        newPassword = newPassword.slice(0, -1) + uppercase.charAt(Math.floor(Math.random() * uppercase.length));
      }
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword)) {
        newPassword = newPassword.slice(0, -1) + symbols.charAt(Math.floor(Math.random() * symbols.length));
      }
    }

    setPassword(newPassword);
  };

  const checkAchievements = (stats: PasswordStats) => {
    const newAchievements = [...achievements];
    let newXp = xp;

    if (stats.level >= 2 && !achievements.includes('first-upgrade')) {
      newAchievements.push('first-upgrade');
      newXp += 50;
    }
    if (stats.level >= 3 && !achievements.includes('security-master')) {
      newAchievements.push('security-master');
      newXp += 100;
    }
    if (stats.level >= 4 && !achievements.includes('password-expert')) {
      newAchievements.push('password-expert');
      newXp += 200;
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
    if (stats.length >= 20 && !achievements.includes('length-champion')) {
      newAchievements.push('length-champion');
      newXp += 150;
    }

    setAchievements(newAchievements);
    setXp(newXp);
  };

  useEffect(() => {
    if (password) {
      const stats = calculatePasswordStats(password);
      setCurrentLevel(stats.level);
      checkAchievements(stats);
    }
  }, [password]);

  const passwordStats = password ? calculatePasswordStats(password) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-6xl animate-bounce">🎉</div>
          <div className="absolute text-4xl animate-ping">⭐</div>
        </div>
      )}
      
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            🔐 Generador de Contraseñas Épico
          </h1>
          <p className="text-xl text-blue-200">
            ¡Conviértete en un maestro de la seguridad digital!
          </p>
          
          {/* XP Display */}
          <div className="flex items-center justify-center space-x-4">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-full">
              <span className="text-white font-bold">XP: {xp}</span>
            </div>
            <div className="flex space-x-1">
              {achievements.map((achievement, index) => (
                <div key={achievement} className="animate-pulse">
                  <Award className="w-6 h-6 text-yellow-400" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security Levels */}
        <SecurityLevels currentLevel={currentLevel} onGeneratePassword={generatePassword} />

        {/* Password Display */}
        <Card className="p-6 bg-black/20 backdrop-blur-sm border-cyan-500/30">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
                <Lock className="w-5 h-5" />
                <span>Tu Contraseña Generada</span>
              </h3>
              <Button
                onClick={() => {
                  if (password) {
                    navigator.clipboard.writeText(password);
                  }
                }}
                className="bg-green-600 hover:bg-green-700"
                disabled={!password}
              >
                📋 Copiar
              </Button>
            </div>
            
            <div className="bg-gray-900 p-4 rounded-lg border-2 border-dashed border-gray-600">
              <code className="text-green-400 text-lg font-mono break-all">
                {password || 'Genera una contraseña para comenzar...'}
              </code>
            </div>

            {passwordStats && (
              <PasswordStrengthBar 
                stats={passwordStats}
                className="animate-fade-in"
              />
            )}
          </div>
        </Card>

        {/* Achievement System */}
        <AchievementSystem achievements={achievements} xp={xp} />

        {/* Tips */}
        <PasswordTips currentLevel={currentLevel} />
      </div>
    </div>
  );
};

export default PasswordGenerator;
