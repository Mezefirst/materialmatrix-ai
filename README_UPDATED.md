# Material Tailoring Platform

An AI-powered web application for materials scientists, engineers, and researchers to design, simulate, and optimize novel materials through an intelligent interface.

## 🚀 Key Features

### Material Design
- **Interactive Periodic Table**: Visual element selection with click-to-add composition building
- **Polymer Development**: Combine monomers to design custom polymers with controlled properties
- **Material Database**: Browse and modify real-world materials from comprehensive database

### AI-Powered Analysis
- **Property Prediction**: Instantly predict mechanical, electrical, and chemical properties
- **Composition Recommendations**: Get intelligent suggestions to improve your material
- **Property Target Search**: Find materials that meet specific performance requirements
- **Quick Analysis**: Identify composition issues and get targeted improvements

### Optimization & Simulation
- **Multi-Objective Optimization**: Balance cost, performance, sustainability, and availability
- **Environmental Conditions**: Simulate properties under various temperature, humidity, and pressure
- **Thermal Analysis**: Predict glass transition, melting, and decomposition temperatures for polymers

## 🎯 Quick Start Workflows

### Workflow 1: Design from Elements
1. Select elements from the periodic table
2. Adjust composition percentages
3. Set environmental conditions
4. Simulate properties
5. Get AI recommendations for improvements
6. Apply suggestions and re-simulate

### Workflow 2: Find by Property Target
1. Click "Find by Property" in header
2. Select property type (e.g., Tensile Strength)
3. Enter target value (e.g., 500 MPa)
4. Review AI-suggested compositions
5. Apply to workspace and verify

### Workflow 3: Polymer Design
1. Switch to "Polymers" tab
2. Select 1-5 monomers from library
3. Adjust mole fractions
4. Set polymer architecture
5. Simulate thermal and mechanical properties
6. Save polymer formulation

## 📊 Features in Detail

### Material Recommendations
After simulating properties, get 3-5 intelligent suggestions including:
- Complete composition with element percentages
- Scientific rationale for the change
- Expected property improvements
- Potential trade-offs
- Impact level (high/medium/low)

### Composition Analysis
Identify issues in your current composition:
- Chemical incompatibilities
- Processing challenges
- Suboptimal element ratios
- Quick fix suggestions with one-click application

### Property-Based Search
Reverse engineer materials from requirements:
- Specify any target property value
- Get 3 scientifically valid compositions
- Understand why each meets your target
- Direct application to workspace

## 🛠️ Technology Stack

- **Frontend**: React 19 + TypeScript
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS v4
- **Icons**: Phosphor Icons
- **AI**: OpenAI GPT-4o via Spark SDK
- **State**: React hooks + Spark KV persistence
- **Build**: Vite

## 📚 Documentation

- [Feature Overview](./RECOMMENDATIONS_FEATURE.md) - Detailed guide to recommendation features
- [PRD](./PRD.md) - Product requirements and design philosophy

---

## ✨ Spark Template Info

This application was built using the Spark Template with:
- Clean, minimal Spark environment
- Pre-configured for local development
- Ready to scale with your ideas

📄 **License**: The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.
