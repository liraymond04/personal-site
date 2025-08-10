---
layout: project-post
title: olc-dijkstra
tags: programming, data-structures-and-algorithms, c++, visualization, olc
keywords: C++, graph theory, shortest path, Dijkstra's algorithm, visualization
date: 2024-08-09
description: A GUI implementation and interactive visualization of Dijkstra's shortest path algorithm using the OneLoneCoder Pixel Game Engine.
---

# olc-dijkstra

This project is a graphical user interface (GUI) implementation of **Dijkstra's shortest path algorithm** using the C++-based **OneLoneCoder Pixel Game Engine (OLC PGE)**. It provides an interactive visualization of the algorithm in action, which is a powerful way to understand how it works.

![dijkstra](https://user-images.githubusercontent.com/39678448/184523029-138e6915-8f88-4b95-a595-20350363bdbf.gif)

## Project Overview

Dijkstra's algorithm is a fundamental algorithm in graph theory that finds the shortest paths between nodes in a graph. This project brings the algorithm to life by allowing users to create a graph and then watch the algorithm's greedy approach unfold as it systematically determines the shortest path from a starting node to all other reachable nodes. This makes complex concepts like `distance relaxation` and `priority queues` much more intuitive to grasp.

### Technologies
- **C++:** The core programming language for the entire project.
- **OneLoneCoder Pixel Game Engine (OLC PGE):** A lightweight and easy-to-use library for creating graphical applications and games with minimal boilerplate. It handles the rendering and user input, making it a perfect tool for visualizations like this one.
- **Graph Data Structures:** The project uses an **adjacency list** to represent the graph, and a **min-priority queue** to efficiently select the next node to visit.

### What is Dijkstra's Algorithm?

Dijkstra's algorithm solves the single-source shortest path problem for a graph with non-negative edge weights. It works by keeping a set of visited nodes and a list of distances from the source node to every other node. It repeatedly selects the unvisited node with the smallest known distance and updates the distances of its neighbors if a shorter path is found. This process continues until all nodes have been visited, resulting in the shortest path from the source to all other nodes.

This project beautifully visualizes this process, showing the shortest path being constructed in real-time.
