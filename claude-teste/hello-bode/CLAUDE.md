# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive Next.js 15 application featuring draggable colored balls with dynamic color changes. Built with TypeScript, Tailwind CSS, and custom mouse-based drag-and-drop functionality.

## Development Commands

```bash
# Development server (uses Turbopack)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Architecture

### Next.js App Router Structure

- Uses App Router (`app/` directory) instead of Pages Router
- `app/layout.tsx`: Root layout with metadata (Portuguese locale)
- `app/page.tsx`: Main interactive page (Client Component)
- `app/globals.css`: Tailwind CSS imports

### Client Components

The main page (`app/page.tsx`) MUST use `"use client"` directive because it:
- Uses React hooks (useState, useRef, useEffect)
- Handles browser events (mouse events)
- Uses styled-jsx for custom animations

### Drag-and-Drop System

Custom implementation using mouse events (NOT HTML5 drag API):
- `handleMouseDown`: Captures initial position and sets drag state
- `handleMouseMove`: Tracks mouse position and detects collision with other balls
- `handleMouseUp`: Swaps ball positions and changes color
- Uses `transform: translate()` for visual movement
- Collision detection via distance calculation between ball centers

Key state management:
- `balls`: Array of ball objects with id and Tailwind gradient classes
- `dragState`: Tracks dragging ball index and delta positions
- `hoveredIndex`: Identifies target ball for swap
- `ballRefs`: React refs for DOM element access during collision detection

### Styling

- Tailwind CSS for utility classes
- Custom animations via styled-jsx (gradient background, bounce delays)
- Dynamic Tailwind classes for ball gradients (stored as strings in state)
- Inline styles for drag transforms and conditional styling

## Key Patterns

When modifying interactive elements:
- Keep drag-and-drop logic in mouse event handlers, not HTML5 drag events
- Ball colors are Tailwind gradient class strings, not hex values
- Window event listeners must be cleaned up in useEffect return
- Collision detection happens during mousemove, not on drop
