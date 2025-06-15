
import React from 'react';
import { Shield, Lock, Star, Award } from 'lucide-react';

interface PasswordStats {
  length: number;
  hasLower: boolean;
  hasUpper: boolean;
  hasNumbers: boolean;
  hasSymbols: boolean;
  level: number;
  score: number;
}

interface PasswordStrengthBarProps {
  stats: PasswordStats;
  className?: string;
}

const PasswordStrengthBar: React.FC<PasswordStrengthBarProps> = ({ stats, className = '' }) => {
  const getStrengthInfo = () => {
    switch (stats.level) {
      case 1:
        return {
          text: 'Básico',
          color: 'from-red-500 to-red-600',
          bgColor: 'bg-red-100',
          icon: Lock,
          description: 'Tu contraseña es vulnerable. ¡Mejórala!'
        };
      case 2:
        return {
          text: 'Intermedio',
          color: 'from-yellow-500 to-orange-500',
          bgColor: 'bg-yellow-100',
          icon: Shield,
          description: '¡Bien! Pero aún puede ser más fuerte.'
        };
      case 3:
        return {
          text: 'Avanzado',
          color: 'from-green-400 to-green-600',
          bgColor: 'bg-green-100',
          icon: Star,
          description: '¡Excelente! Contraseña muy segura.'
        };
      case 4:
        return {
          text: 'Experto',
          color: 'from-emerald-400 via-cyan-500 to-blue-600',
          bgColor: 'bg-gradient-to-r from-green-100 to-blue-100',
          icon: Award,
          description: '🏆 ¡ÉPICO! Contraseña de nivel profesional.'
        };
      default:
        return {
          text: 'Débil',
          color: 'from-gray-400 to-gray-500',
          bgColor: 'bg-gray-100',
          icon: Lock,
          description: 'Necesitas una contraseña más fuerte.'
        };
    }
  };

  const strengthInfo = getStrengthInfo();
  const IconComponent = strengthInfo.icon;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Strength Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-white font-medium flex items-center space-x-2">
            <IconComponent className="w-5 h-5" />
            <span>Nivel de Seguridad: {strengthInfo.text}</span>
          </span>
          <span className="text-sm text-blue-200">{stats.score}%</span>
        </div>
        
        <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${strengthInfo.color} transition-all duration-500 ease-out animate-pulse`}
            style={{ width: `${stats.score}%` }}
          />
        </div>
        
        <p className="text-sm text-blue-200">{strengthInfo.description}</p>
      </div>

      {/* Requirements Checklist */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className={`flex items-center space-x-2 p-2 rounded-lg ${stats.length >= 8 ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'}`}>
          <div className={`w-4 h-4 rounded-full ${stats.length >= 8 ? 'bg-green-500' : 'bg-red-500'} flex items-center justify-center text-xs`}>
            {stats.length >= 8 ? '✓' : '✗'}
          </div>
          <span className="text-sm">8+ chars</span>
        </div>

        <div className={`flex items-center space-x-2 p-2 rounded-lg ${stats.hasNumbers ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'}`}>
          <div className={`w-4 h-4 rounded-full ${stats.hasNumbers ? 'bg-green-500' : 'bg-red-500'} flex items-center justify-center text-xs`}>
            {stats.hasNumbers ? '✓' : '✗'}
          </div>
          <span className="text-sm">Números</span>
        </div>

        <div className={`flex items-center space-x-2 p-2 rounded-lg ${stats.hasUpper ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'}`}>
          <div className={`w-4 h-4 rounded-full ${stats.hasUpper ? 'bg-green-500' : 'bg-red-500'} flex items-center justify-center text-xs`}>
            {stats.hasUpper ? '✓' : '✗'}
          </div>
          <span className="text-sm">Mayúsculas</span>
        </div>

        <div className={`flex items-center space-x-2 p-2 rounded-lg ${stats.hasSymbols ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'}`}>
          <div className={`w-4 h-4 rounded-full ${stats.hasSymbols ? 'bg-green-500' : 'bg-red-500'} flex items-center justify-center text-xs`}>
            {stats.hasSymbols ? '✓' : '✗'}
          </div>
          <span className="text-sm">Símbolos</span>
        </div>
      </div>

      {/* Security Visualization */}
      <div className="text-center">
        <div className="text-lg font-semibold text-white mb-2">
          Tiempo estimado para romper esta contraseña:
        </div>
        <div className="text-2xl font-bold text-cyan-400">
          {stats.level === 1 && '< 1 segundo ⚠️'}
          {stats.level === 2 && '~1 minuto 🕐'}
          {stats.level === 3 && '~34.000 años 🛡️'}
          {stats.level === 4 && '~Billones de años 🚀'}
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthBar;
