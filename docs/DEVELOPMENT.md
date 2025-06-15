
# 🛠️ Guía de Desarrollo

Esta guía cubre el proceso de desarrollo para el Generador de Contraseñas Interactivo, incluyendo mejores prácticas, convenciones y flujos de trabajo específicos para Lovable.

## 🚀 Configuración del Entorno

### Prerrequisitos
- Node.js 18+ y npm
- Cuenta en [Lovable](https://lovable.dev)
- Git configurado
- Editor de código (VS Code recomendado)

### Configuración Inicial

#### Opción 1: Con Lovable (Recomendado)
```bash
# No se requiere configuración local
# Simplemente visita el proyecto en Lovable
```

#### Opción 2: Desarrollo Local
```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/password-generator.git
cd password-generator

# Instala dependencias
npm install

# Inicia el servidor de desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:8080
```

## 📋 Scripts Disponibles

```json
{
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
}
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/              # Componentes reutilizables
│   ├── ui/                 # Componentes base de shadcn/ui
│   ├── PasswordGenerator.tsx    # Componente principal
│   ├── SecurityLevels.tsx      # Sistema de niveles
│   ├── AchievementSystem.tsx   # Sistema de logros
│   ├── PasswordStrengthBar.tsx # Barra de fuerza
│   └── PasswordTips.tsx        # Tips educativos
├── hooks/                  # Custom hooks (futuro)
├── lib/                    # Utilidades y helpers
│   └── utils.ts           # Funciones auxiliares
├── pages/                  # Páginas de la aplicación
│   ├── Index.tsx          # Página principal
│   └── NotFound.tsx       # Página 404
└── types/                  # Definiciones de tipos (futuro)
```

## 🎨 Convenciones de Código

### Nomenclatura
```typescript
// Componentes: PascalCase
const PasswordGenerator = () => { };

// Hooks: camelCase con prefijo 'use'
const usePasswordGeneration = () => { };

// Funciones: camelCase
const calculatePasswordStrength = () => { };

// Constantes: UPPER_SNAKE_CASE
const MAX_PASSWORD_LENGTH = 32;

// Props interfaces: ComponentNameProps
interface PasswordGeneratorProps {
  level: number;
}
```

### Estructura de Componentes
```typescript
import React from 'react';
import { Card } from '@/components/ui/card';

// 1. Props interface
interface ComponentProps {
  prop1: string;
  prop2: number;
}

// 2. Componente principal
const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // 3. Estado local
  const [state, setState] = useState(defaultValue);

  // 4. Efectos
  useEffect(() => {
    // lógica de efecto
  }, []);

  // 5. Funciones auxiliares
  const handleAction = () => {
    // lógica del handler
  };

  // 6. Render
  return (
    <Card>
      {/* JSX */}
    </Card>
  );
};

export default Component;
```

### Estilos con Tailwind
```typescript
// ✅ Correcto: Clases organizadas y legibles
<div className="
  flex items-center justify-center
  w-full h-16
  bg-gradient-to-r from-blue-500 to-purple-600
  text-white font-semibold
  rounded-lg shadow-lg
  transition-all duration-300
  hover:scale-105 hover:shadow-xl
">

// ❌ Evitar: Clases desordenadas
<div className="flex bg-blue-500 w-full hover:scale-105 text-white rounded-lg items-center">
```

## 🔧 Desarrollo con Lovable

### Prompts Efectivos

#### 1. Prompts Específicos
```
✅ "En SecurityLevels.tsx, añade una animación de pulso a la tarjeta del nivel actual"
❌ "Mejora las animaciones"
```

#### 2. Prompts Contextuales
```
✅ "Modifica el componente PasswordStrengthBar para mostrar porcentajes"
❌ "Cambia la barra"
```

#### 3. Prompts Incrementales
```
✅ "Primero añade el botón, luego la funcionalidad de copiar"
❌ "Crea un sistema completo de clipboard con historial y notificaciones"
```

### Flujo de Desarrollo Recomendado

1. **Planificar**: Define qué quieres lograr
2. **Prompt Inicial**: Describe la funcionalidad básica
3. **Iterar**: Refina con prompts específicos
4. **Probar**: Verifica en la vista previa
5. **Documentar**: Actualiza documentación si es necesario

### Ejemplos de Prompts por Tipo de Cambio

#### UI/UX Improvements
```
"Mejora el hover effect de las tarjetas de nivel con una transición suave"
"Añade un efecto de resplandor cuando se desbloquea un logro"
"Crea un loading state para cuando se genera una contraseña"
```

#### Nuevas Funcionalidades
```
"Añade un botón para copiar la contraseña al portapapeles"
"Crea un componente de historia que muestre las últimas contraseñas generadas"
"Implementa un sistema de favoritos para guardar contraseñas preferidas"
```

#### Bug Fixes
```
"Arregla el problema donde la barra de fuerza no se actualiza correctamente"
"Soluciona el issue de responsive design en pantallas pequeñas"
```

## 🧪 Testing y Debugging

### Testing Manual
- ✅ Probar en diferentes tamaños de pantalla
- ✅ Verificar todas las transiciones de nivel
- ✅ Confirmar que los logros se desbloquean correctamente
- ✅ Validar la generación de contraseñas en todos los niveles

### Debugging con Lovable
```
Prompts de debugging:
"Añade console.logs para rastrear el flujo de generación de contraseñas"
"Muestra en la consola cuándo se otorga XP al usuario"
"Verifica que no hay errores en la consola del navegador"
```

### Console Logs Útiles
```typescript
// Debugging de estado
console.log('Current Level:', currentLevel);
console.log('User XP:', userXP);
console.log('Generated Password:', generatedPassword);

// Debugging de eventos
console.log('Level changed to:', newLevel);
console.log('Achievement unlocked:', achievementId);
```

## 📱 Responsive Development

### Mobile-First Approach
```typescript
// Siempre empezar con mobile
<div className="
  flex flex-col gap-4           // Mobile: columna
  md:flex-row md:gap-6         // Tablet: fila
  lg:grid lg:grid-cols-4       // Desktop: grid
">
```

### Testing Responsive
- Chrome DevTools para diferentes dispositivos
- Probar rotación de pantalla
- Verificar touch interactions

## 🔄 Git Workflow

### Commits Descriptivos
```bash
# ✅ Buenos commits
git commit -m "feat: añade animación de pulso a nivel activo"
git commit -m "fix: corrige responsive design en móvil"
git commit -m "docs: actualiza guía de contribución"

# ❌ Commits poco descriptivos
git commit -m "cambios"
git commit -m "fix"
```

### Branching Strategy
```bash
# Feature branches
git checkout -b feature/nueva-funcionalidad
git checkout -b fix/corregir-bug
git checkout -b docs/actualizar-readme
```

## 🚀 Deployment

### Build y Preview
```bash
# Construir para producción
npm run build

# Preview local del build
npm run preview
```

### Deployment con Lovable
1. Los cambios se despliegan automáticamente
2. Usa el botón "Publish" en la interfaz
3. El sitio estará disponible en `tu-proyecto.lovable.app`

## 📊 Performance Guidelines

### Optimización de Componentes
```typescript
// ✅ Memoización cuando sea necesario
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* render logic */}</div>;
});

// ✅ Lazy loading para componentes grandes
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

### Bundle Size
- Evitar importaciones innecesarias
- Usar tree shaking efectivamente
- Comprimir imágenes y assets

## 🔍 Code Review Checklist

### Antes de Hacer Commit
- [ ] ¿El código es fácil de leer y entender?
- [ ] ¿Hay console.logs de debugging que deben removerse?
- [ ] ¿El diseño es responsive?
- [ ] ¿Se mantienen las convenciones de nomenclatura?
- [ ] ¿Los tipos TypeScript están correctos?
- [ ] ¿Se añadieron comentarios donde es necesario?

### Prompts de Review
```
"Revisa el código y elimina console.logs innecesarios"
"Optimiza el rendimiento del componente SecurityLevels"
"Verifica que todos los tipos TypeScript están correctos"
```

## 🆘 Troubleshooting Común

### Problemas de Build
```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install

# Verificar versiones
node --version
npm --version
```

### Problemas con Lovable
- Refrescar la página del proyecto
- Verificar conexión de internet
- Comprobar el estado de Lovable en su página de estado

### Problemas de Tipos TypeScript
```typescript
// ✅ Usar tipos específicos
interface Props {
  level: 1 | 2 | 3 | 4;
  onComplete: (level: number) => void;
}

// ❌ Evitar any
interface Props {
  data: any; // evitar
}
```

## 🎯 Mejores Prácticas

### Desarrollo Iterativo
1. Haz cambios pequeños y frecuentes
2. Prueba cada cambio inmediatamente
3. Documenta decisiones importantes
4. Mantén el código simple y legible

### Colaboración Efectiva
1. Usa prompts claros y específicos
2. Comparte capturas de pantalla cuando sea útil
3. Documenta nuevas funcionalidades
4. Ayuda a otros contribuyentes

### Mantenimiento del Código
1. Refactoriza regularmente
2. Actualiza documentación
3. Mantén dependencias actualizadas
4. Revisa y limpia código obsoleto

¡Con estas pautas, estarás listo para contribuir efectivamente al proyecto usando Lovable! 🚀
