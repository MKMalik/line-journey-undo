# Line Journey Undo

Line Journey Undo is a Visual Studio Code extension designed to enable developers to navigate backward and forward within the editor, effortlessly moving through previously visited lines while maintaining the cursor's column position. This facilitates smooth and efficient line-based navigation, enhancing the coding experience.

## Features

- **Line-based Navigation:** Navigate backward and forward within the same line.
- **Retain Column Position:** Retains the cursor's column position while navigating within a line.
- **Configurable Settings:** Customize delay timer and maximum history limit for line navigation.

## Usage

Use the following keyboard shortcuts to navigate backward and forward:

- Navigate Backward: `Ctrl+Alt+Z`
- Navigate Forward: `Ctrl+Alt+X`

Alternatively, you can access these commands via the Command Palette:

- `Line Journey Undo: Navigate Backward in Line`
- `Line Journey Undo: Navigate Forward in Line`

## Benefits and Usage

### Who can benefit from Line Journey Undo?

- **Developers:** Line Journey Undo is tailored for developers who work extensively with code in Visual Studio Code, enhancing their efficiency by providing precise line-based navigation within the editor.

- **Code Reviewers:** It aids code reviewers by allowing them to easily backtrack and revisit specific lines while maintaining their context during code reviews.

### Key Benefits:

- **Efficient Code Navigation:** Developers often navigate through code while making changes. This extension helps them quickly jump back to previously edited lines, eliminating the need for manual scrolling or searching, thus improving productivity.

- **Error Correction and Review:** When reviewing or debugging code, developers may make changes in different areas. With this extension, they can easily revisit and reevaluate specific lines they modified, aiding in error correction and review processes.

- **Refactoring Assistance:** During refactoring or restructuring code, developers frequently move across various sections. This tool allows them to retrace their steps by navigating to earlier points of modification, aiding in maintaining code integrity.

- **Learning and Teaching:** For learning purposes, this extension can help learners understand how changes were made in different parts of the codebase. For mentors or teachers, it can facilitate explaining code modifications step by step.

- **Customizable Workflow Enhancement:** Offering customizable options, like delay-based recording or setting a limit on stored lines, allows developers to tailor the extension to their preferences and workflow, enhancing their coding experience.

### How Line Journey Undo helps:

- **Streamlined Review and Debugging:** Facilitates easy revisitation and reassessment of specific code segments, improving the efficiency of code review and debugging processes.

- **Enhanced Code Understanding:** Enables users to comprehend and follow code changes by navigating back to previous modifications, aiding in code comprehension and learning.

- **Maintaining Code Integrity:** Assists in maintaining the integrity of the codebase during refactoring or restructuring by allowing developers to trace back their steps and review earlier modifications.


## Configuration

This extension provides configurable settings via Visual Studio Code's settings:

- `lineJourneyUndo.delayTimer`: Set the delay timer for line navigation (in milliseconds).
- `lineJourneyUndo.maxHistoryLimit`: Set the maximum history limit for line navigation.

## Installation

You can install the Line Journey Undo extension via the Visual Studio Code Marketplace [here](https://marketplace.visualstudio.com/items?itemName=line-journey-undo).
