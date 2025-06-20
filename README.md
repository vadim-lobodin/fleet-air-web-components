# Air Web Components

> React/Storybook component library mirroring Fleet Air (Compose) components for web prototyping.

## 📍 Location & Purpose

**Current Location**: `fleet/air-web-components/` (Inside Fleet repository)  
**Git Status**: ✅ Excluded from commits via `.gitignore`  
**Final Destination**: Will be moved to separate repository for team distribution

## 🎯 Project Goal

Create exact web replicas of Fleet Air components using React + Radix UI for rapid prototyping and cross-platform design consistency.

## 📁 Project Structure

```
air-web-components/
├── air-web-components-readme.md    # This file
├── air-web-components-plan.md      # Comprehensive implementation plan
├── docs/                          # Component analysis and documentation
├── src/                           # React components and design tokens
└── stories/                       # Storybook stories
```

## 🔄 Development Workflow

### Advantages of Fleet Integration
- **Direct Access**: Easy reference to `../compose/theme/src/` components
- **Token Extraction**: Copy design values from Kotlin source files  
- **Visual Comparison**: Use `../gallery/` examples for reference
- **Iterative Development**: Quick validation against original components

### Component Analysis Process
1. **Study Kotlin Component**: Analyze structure, variants, props
2. **Extract Design Tokens**: Copy colors, typography, spacing values
3. **Build React Equivalent**: Implement with Radix UI primitives
4. **Create Storybook Story**: Document all variants and states
5. **Visual Validation**: Compare with Fleet Air original

## 🚀 Next Steps

1. **Review [air-web-components-plan.md](./air-web-components-plan.md)** - Detailed implementation roadmap
2. **Initialize React/Storybook project** - Set up development environment
3. **Start with design tokens** - Typography, colors, spacing
4. **Begin with Button component** - First concrete implementation

## 📞 Migration Plan

When ready for team distribution:
1. **Cut folder** from Fleet directory
2. **Initialize new Git repository**
3. **Set up CI/CD pipeline**
4. **Publish as NPM package**
5. **Share with development teams**

## ⚠️ Important Notes

- **Never commit this folder** to Fleet repository (handled by .gitignore)
- **Keep in sync** with Fleet Air component updates
- **Maintain exact visual parity** with original components
- **Document any deviations** and reasons

---

*This project enables rapid web prototyping while maintaining design consistency with the Fleet application.* 