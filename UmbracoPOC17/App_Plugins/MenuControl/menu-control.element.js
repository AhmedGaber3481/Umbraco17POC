import { html, css, LitElement } from '@umbraco-cms/backoffice/external/lit';
import { UmbChangeEvent } from '@umbraco-cms/backoffice/event';

export class MenuControlElement extends LitElement {
  
  static styles = css`
    :host {
      display: block;
      font-family: var(--uui-font-family);
    }
    
    .menu-container {
      border: 1px solid var(--uui-color-border);
      border-radius: var(--uui-border-radius);
      background: var(--uui-color-surface);
      padding: var(--uui-size-space-4);
      min-height: 200px;
    }
    
    .menu-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--uui-size-space-4);
      padding-bottom: var(--uui-size-space-3);
      border-bottom: 1px solid var(--uui-color-border);
    }
    
    .menu-title {
      font-weight: 600;
      font-size: 14px;
      color: var(--uui-color-text);
    }
    
    .add-root-btn {
      background: var(--uui-color-primary);
      color: var(--uui-color-primary-contrast);
      border: none;
      padding: var(--uui-size-space-2) var(--uui-size-space-4);
      border-radius: var(--uui-border-radius);
      cursor: pointer;
      font-size: 13px;
      display: flex;
      align-items: center;
      gap: var(--uui-size-space-2);
    }
    
    .add-root-btn:hover {
      background: var(--uui-color-primary-emphasis);
    }
    
    .menu-tree {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    
    .menu-item {
      margin-bottom: var(--uui-size-space-2);
    }
    
    .menu-node {
      display: flex;
      align-items: center;
      padding: var(--uui-size-space-2) var(--uui-size-space-3);
      border-radius: var(--uui-border-radius);
      background: var(--uui-color-surface-alt);
      border: 1px solid var(--uui-color-border);
      gap: var(--uui-size-space-2);
    }
    
    .menu-node:hover {
      background: var(--uui-color-surface-emphasis);
    }
    
    .menu-node.expanded {
      background: var(--uui-color-surface-emphasis);
    }
    
    .expand-icon {
      cursor: pointer;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--uui-color-text-alt);
      font-size: 10px;
    }
    
    .expand-icon:hover {
      color: var(--uui-color-text);
    }
    
    .node-label {
      flex: 1;
      font-size: 13px;
      color: var(--uui-color-text);
      cursor: pointer;
    }
    
    .node-label:hover {
      color: var(--uui-color-primary);
    }
    
    .node-actions {
      display: flex;
      gap: var(--uui-size-space-1);
      opacity: 0;
      transition: opacity 0.2s;
    }
    
    .menu-node:hover .node-actions {
      opacity: 1;
    }
    
    .action-btn {
      background: transparent;
      border: none;
      padding: var(--uui-size-space-1);
      cursor: pointer;
      color: var(--uui-color-text-alt);
      border-radius: var(--uui-border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      font-size: 14px;
    }
    
    .action-btn:hover {
      background: var(--uui-color-surface);
      color: var(--uui-color-text);
    }
    
    .action-btn.edit:hover {
      color: var(--uui-color-primary);
    }
    
    .action-btn.delete:hover {
      color: var(--uui-color-danger);
    }
    
    .children {
      margin-left: var(--uui-size-space-6);
      margin-top: var(--uui-size-space-2);
      padding-left: var(--uui-size-space-4);
      border-left: 2px solid var(--uui-color-border);
    }
    
    .empty-state {
      text-align: center;
      padding: var(--uui-size-space-6);
      color: var(--uui-color-text-alt);
      font-size: 13px;
    }
    
    .dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
    }
    
    .dialog {
      background: var(--uui-color-surface);
      border-radius: var(--uui-border-radius);
      padding: var(--uui-size-space-5);
      min-width: 400px;
      max-width: 500px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .dialog-header {
      margin-bottom: var(--uui-size-space-4);
      font-weight: 600;
      font-size: 16px;
      color: var(--uui-color-text);
    }
    
    .dialog-form {
      display: flex;
      flex-direction: column;
      gap: var(--uui-size-space-4);
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
      gap: var(--uui-size-space-2);
    }
    
    .form-label {
      font-size: 13px;
      font-weight: 500;
      color: var(--uui-color-text);
    }
    
    .form-input {
      padding: var(--uui-size-space-2) var(--uui-size-space-3);
      border: 1px solid var(--uui-color-border);
      border-radius: var(--uui-border-radius);
      font-size: 13px;
      background: var(--uui-color-surface);
      color: var(--uui-color-text);
      font-family: inherit;
    }
    
    .form-input:focus {
      outline: none;
      border-color: var(--uui-color-primary);
      box-shadow: 0 0 0 2px var(--uui-color-primary-standalone);
    }
    
    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--uui-size-space-2);
      margin-top: var(--uui-size-space-4);
    }
    
    .btn {
      padding: var(--uui-size-space-2) var(--uui-size-space-4);
      border-radius: var(--uui-border-radius);
      border: none;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      font-family: inherit;
    }
    
    .btn-primary {
      background: var(--uui-color-primary);
      color: var(--uui-color-primary-contrast);
    }
    
    .btn-primary:hover {
      background: var(--uui-color-primary-emphasis);
    }
    
    .btn-secondary {
      background: var(--uui-color-surface-alt);
      color: var(--uui-color-text);
      border: 1px solid var(--uui-color-border);
    }
    
    .btn-secondary:hover {
      background: var(--uui-color-surface-emphasis);
    }
    
    .btn-danger {
      background: var(--uui-color-danger);
      color: var(--uui-color-danger-contrast);
    }
    
    .btn-danger:hover {
      background: var(--uui-color-danger-emphasis);
    }
  `;

  static properties = {
    value: { type: String }
  };

  constructor() {
    super();
    this.value = '';
    this._nodes = [];
    this._editingNode = null;
    this._deletingNode = null;
    this._parentNodeId = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadValue();
  }

  updated(changedProperties) {
    if (changedProperties.has('value')) {
      this._loadValue();
    }
  }

  _loadValue() {
    try {
      if (this.value && this.value !== '') {
        // Parse the value (could be string or already parsed)
        let parsed = typeof (this.value) === "string" ?
            JSON.parse(this.value) : this.value;
        
        // Clone the array/object to avoid frozen object errors
        // Umbraco may pass frozen objects, so we need to create a mutable copy
        if (Array.isArray(parsed)) {
          this._nodes = JSON.parse(JSON.stringify(parsed));
        } else {
          this._nodes = [];
        }
      } else {
        this._nodes = [];
      }
    } catch (e) {
      console.error('Error parsing menu control value:', e);
      this._nodes = [];
    }
    this.requestUpdate();
  }

  _updateValue() {
    const value = JSON.stringify(this._nodes);
    // Ensure we trigger the property update properly
    if (this.value !== value) {
      this.value = value;
      // Dispatch change event to notify Umbraco that the value has changed
      this.dispatchEvent(new UmbChangeEvent());
    }
  }

  _generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  _findNodeById(nodes, id) {
    for (const node of nodes) {
      if (node.id === id) {
        return { node, parent: null, index: nodes.indexOf(node), nodes };
      }
      if (node.children && node.children.length > 0) {
        const result = this._findNodeById(node.children, id);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }

  _addNode(parentId = null) {
    this._parentNodeId = parentId;
    this._editingNode = { id: this._generateId(), name: '', url: '', children: [] };
    this.requestUpdate();
  }

  _editNode(nodeId) {
    const result = this._findNodeById(this._nodes, nodeId);
    if (result) {
      this._editingNode = { ...result.node };
      this._parentNodeId = result.node.parentId || null;
      this.requestUpdate();
    }
  }

  _deleteNode(nodeId) {
    const result = this._findNodeById(this._nodes, nodeId);
    if (result) {
      this._deletingNode = result.node;
      this.requestUpdate();
    }
  }

  _confirmDelete() {
    if (this._deletingNode) {
      const result = this._findNodeById(this._nodes, this._deletingNode.id);
      if (result) {
        result.nodes.splice(result.index, 1);
        this._updateValue();
      }
      this._deletingNode = null;
      this.requestUpdate();
    }
  }

  _cancelDelete() {
    this._deletingNode = null;
    this.requestUpdate();
  }

  _saveNode() {
    if (!this._editingNode.name.trim()) {
      alert('Please enter a name');
      return;
    }

    const result = this._findNodeById(this._nodes, this._editingNode.id);
    
    if (result) {
      // Update existing node
      result.node.name = this._editingNode.name;
      result.node.url = this._editingNode.url || '';
    } else {
      // Add new node
      const newNode = {
        id: this._editingNode.id,
        name: this._editingNode.name,
        url: this._editingNode.url || '',
        children: []
      };

      if (this._parentNodeId) {
        const parentResult = this._findNodeById(this._nodes, this._parentNodeId);
        if (parentResult) {
          if (!parentResult.node.children) {
            parentResult.node.children = [];
          }
          parentResult.node.children.push(newNode);
        }
      } else {
        this._nodes.push(newNode);
      }
    }

    this._updateValue();
    this._editingNode = null;
    this._parentNodeId = null;
    this.requestUpdate();
  }

  _cancelEdit() {
    this._editingNode = null;
    this._parentNodeId = null;
    this.requestUpdate();
  }

  _toggleExpanded(node) {
    node.expanded = !node.expanded;
    this.requestUpdate();
  }

  _renderNode(node, level = 0) {
    const hasChildren = node.children && node.children.length > 0;
    
    return html`
      <li class="menu-item">
        <div class="menu-node ${node.expanded ? 'expanded' : ''}">
          ${hasChildren ? html`
            <span class="expand-icon" @click="${() => this._toggleExpanded(node)}">
              ${node.expanded ? '▼' : '▶'}
            </span>
          ` : html`<span style="width: 20px;"></span>`}
          
          <span class="node-label" @click="${() => this._editNode(node.id)}">
            ${node.name || 'Untitled'}
          </span>
          
          <div class="node-actions">
            <button class="action-btn edit" 
                    title="Edit"
                    @click="${() => this._editNode(node.id)}">
              ✏️
            </button>
            <button class="action-btn add" 
                    title="Add Child"
                    @click="${() => this._addNode(node.id)}">
              ➕
            </button>
            <button class="action-btn delete" 
                    title="Delete"
                    @click="${() => this._deleteNode(node.id)}">
              🗑️
            </button>
          </div>
        </div>
        
        ${hasChildren && node.expanded ? html`
          <ul class="children">
            ${node.children.map(child => this._renderNode(child, level + 1))}
          </ul>
        ` : ''}
      </li>
    `;
  }

  _renderEditDialog() {
    if (!this._editingNode) return '';
    
    return html`
      <div class="dialog-overlay" @click="${(e) => e.target === e.currentTarget && this._cancelEdit()}">
        <div class="dialog">
          <div class="dialog-header">
            ${this._findNodeById(this._nodes, this._editingNode.id) ? 'Edit Node' : 'Add Node'}
          </div>
          <div class="dialog-form">
            <div class="form-group">
              <label class="form-label">Name *</label>
              <input 
                class="form-input" 
                type="text" 
                .value="${this._editingNode.name}"
                @input="${(e) => { this._editingNode.name = e.target.value; this.requestUpdate(); }}"
                placeholder="Enter node name"
                autofocus>
            </div>
            <div class="form-group">
              <label class="form-label">URL</label>
              <input 
                class="form-input" 
                type="text" 
                .value="${this._editingNode.url || ''}"
                @input="${(e) => { this._editingNode.url = e.target.value; this.requestUpdate(); }}"
                placeholder="Enter URL (optional)">
            </div>
            <div class="dialog-actions">
              <button class="btn btn-secondary" @click="${this._cancelEdit}">Cancel</button>
              <button class="btn btn-primary" @click="${this._saveNode}">Save</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  _renderDeleteDialog() {
    if (!this._deletingNode) return '';
    
    return html`
      <div class="dialog-overlay" @click="${(e) => e.target === e.currentTarget && this._cancelDelete()}">
        <div class="dialog">
          <div class="dialog-header">Delete Node</div>
          <div style="margin-bottom: var(--uui-size-space-4);">
            Are you sure you want to delete "${this._deletingNode.name}"? 
            ${this._deletingNode.children && this._deletingNode.children.length > 0 
              ? html`<strong>This will also delete all child nodes.</strong>` 
              : ''}
          </div>
          <div class="dialog-actions">
            <button class="btn btn-secondary" @click="${this._cancelDelete}">Cancel</button>
            <button class="btn btn-danger" @click="${this._confirmDelete}">Delete</button>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <div class="menu-container">
        <div class="menu-header">
          <span class="menu-title">Menu Items</span>
          <button class="add-root-btn" @click="${() => this._addNode()}">
            ➕ Add Root Node
          </button>
        </div>
        
        ${this._nodes.length > 0 ? html`
          <ul class="menu-tree">
            ${this._nodes.map(node => this._renderNode(node))}
          </ul>
        ` : html`
          <div class="empty-state">
            No menu items yet. Click "Add Root Node" to get started.
          </div>
        `}
        
        ${this._renderEditDialog()}
        ${this._renderDeleteDialog()}
      </div>
    `;
  }
}

customElements.define('menu-control-element', MenuControlElement);

export default MenuControlElement;
