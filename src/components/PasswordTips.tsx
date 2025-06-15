
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Star, Award } from 'lucide-react';

interface PasswordTipsProps {
  currentLevel: number;
}

const PasswordTips: React.FC<PasswordTipsProps> = ({ currentLevel }) => {
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    {
      level: 1,
      icon: Lock,
      title: "¿Sabías que...?",
      content: "Una contraseña de solo 8 letras puede ser descifrada en segundos por un hacker moderno. ¡Es hora de subir de nivel!",
      action: "💡 Agrega números para hacerla más fuerte"
    },
    {
      level: 2,
      icon: Shield,
      title: "Consejo de Seguridad",
      content: "Al agregar números a tu contraseña, aumentas exponencialmente su seguridad. Pero aún puedes hacerlo mejor...",
      action: "🔥 Prueba con mayúsculas y símbolos"
    },
    {
      level: 3,
      icon: Star,
      title: "¡Excelente Progreso!",
      content: "Tu contraseña ahora resistiría miles de años de ataques. Los hackers tendrían que esperar más tiempo que la edad de la humanidad.",
      action: "🚀 ¿Puedes llegar al nivel maestro?"
    },
    {
      level: 4,
      icon: Award,
      title: "¡Eres un Maestro!",
      content: "¡Increíble! Tu contraseña es prácticamente imposible de descifrar. Podrías proteger los secretos más importantes del mundo.",
      action: "🏆 ¡Comparte tu logro con otros!"
    }
  ];

  const securityFacts = [
    "🎯 El 80% de las violaciones de datos se deben a contraseñas débiles",
    "⚡ Un computador moderno puede probar 1 billón de contraseñas por segundo",
    "🔒 Usar 2FA junto con contraseñas seguras reduce el riesgo en un 99.9%",
    "🌍 'password123' sigue siendo una de las contraseñas más usadas del mundo",
    "🎲 Una contraseña aleatoria de 12 caracteres es más segura que una frase de 20 caracteres predecible"
  ];

  const levelTips = tips.filter(tip => tip.level <= currentLevel);
  const currentLevelTip = levelTips[levelTips.length - 1];

  return (
    <div className="space-y-6">
      {/* Main Tip Card */}
      {currentLevelTip && (
        <Card className="p-6 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 backdrop-blur-sm border-cyan-500/30">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
              <currentLevelTip.icon className="w-6 h-6 text-white" />
            </div>
            
            <div className="flex-1 space-y-3">
              <h3 className="text-xl font-bold text-white">{currentLevelTip.title}</h3>
              <p className="text-blue-100 leading-relaxed">{currentLevelTip.content}</p>
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
                <p className="text-yellow-300 font-medium">{currentLevelTip.action}</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Security Facts Carousel */}
      <Card className="p-6 bg-black/20 backdrop-blur-sm border-purple-500/30">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Datos de Ciberseguridad</h3>
            <Button
              onClick={() => setCurrentTip((prev) => (prev + 1) % securityFacts.length)}
              className="bg-purple-600 hover:bg-purple-700"
              size="sm"
            >
              Siguiente Dato
            </Button>
          </div>
          
          <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/30">
            <p className="text-purple-100 text-center text-lg animate-fade-in">
              {securityFacts[currentTip]}
            </p>
          </div>
        </div>
      </Card>

      {/* Best Practices */}
      <Card className="p-6 bg-black/20 backdrop-blur-sm border-green-500/30">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
          <Shield className="w-5 h-5 text-green-400" />
          <span>Mejores Prácticas</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300">Usa contraseñas únicas para cada cuenta</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300">Activa la autenticación de dos factores</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300">Cambia contraseñas regularmente</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-red-300">No uses información personal</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-red-300">Evita palabras del diccionario</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-red-300">No reutilices contraseñas importantes</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PasswordTips;
