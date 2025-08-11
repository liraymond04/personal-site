---
layout: project-post
title: olc-rts
tags: programming, game-development, c++, rts, olc
keywords: C++, game development, real-time strategy, hexagonal grids, pixel game engine
date: 2024-08-09
description: A simple pixel-style hexagonal grid-based real-time strategy game built with the OneLoneCoder Pixel Game Engine.
---

# olc-rts

This project is a simple Real-Time Strategy (RTS) game created from scratch using the **OneLoneCoder Pixel Game Engine (OLC PGE)**. It features a hexagonal tile-based map rendered a faux-3D style to place and move units around. The game serves as a great example of applying fundamental game development concepts, mathematics, data structures, and algorithms to create a playable experience and a unique visual style.

![olc-rts](https://github.com/liraymond04/olc-rts/assets/39678448/3e727835-1750-4ab7-89ab-e193114c25bc)
[Live Demo](https://www.liraymond04.ca/demo/olc-rts)

## Project Features

- **Hexagonal Tile Map:** The game world is built on a hexagonal grid, which provides a unique movement and tactical experience compared to traditional square grids.
- **Simple Pathfinding:** The project includes usage of the A* pathfinding algorithm to easily move units between two tiles.
- **User Interface:** A simple GUI allows players to select units and issue movement commands.

## Technologies

- **C++:** The entire game logic, from rendering to unit movement, is written in C++, showcasing strong object-oriented programming principles.
- **OneLoneCoder Pixel Game Engine (OLC PGE):** This powerful, single-file header library was used for all graphics rendering, input handling, and game loop management. It simplifies the process of creating pixel-based applications, allowing for a focus on core game mechanics.
- **Game Loops & State Management:** The game's flow is controlled by a main game loop, which handles input, updates game state, and renders the scene on every frame.
