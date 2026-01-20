# Menu Control Property Editor for Umbraco v17.1

A custom property editor for Umbraco v17.1 that allows you to create and manage hierarchical menu structures with full CRUD operations.

## Features

- ✅ Add, Edit, and Delete nodes
- ✅ Create and manage child nodes (nested/hierarchical structure)
- ✅ Expand/collapse tree view
- ✅ Store menu data as JSON
- ✅ Modern UI using Umbraco's design system

## Installation

1. The Menu Control package is located in `App_Plugins/MenuControl/`
2. Restart your Umbraco application to load the property editor
3. The property editor will appear in the Property Editor picker as "Menu Control"

## Usage

1. Go to Settings → Data Types
2. Create a new Data Type or edit an existing one
3. Select "Menu Control" as the Property Editor
4. Save the Data Type
5. Add the property to your Document Type
6. Start creating menu items!

## Data Structure

The menu control stores data as JSON with the following structure:

```json
[
  {
    "id": "unique-id",
    "name": "Home",
    "url": "/home",
    "children": [
      {
        "id": "child-id",
        "name": "About",
        "url": "/about",
        "children": []
      }
    ]
  }
]
```

## File Structure

```
App_Plugins/MenuControl/
├── manifest.json          # Package manifest
├── package.json           # NPM package file
├── menu-control.element.js # Main property editor implementation
└── README.md              # This file
```

## Development

The property editor is built using:
- Lit Element (via Umbraco's backoffice)
- Umbraco's UI components and styling
- Vanilla JavaScript

## Notes

- The property editor stores data entirely client-side as JSON
- No backend API controller is required
- Data is persisted when the content item is saved
- Supports unlimited nesting levels

