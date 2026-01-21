import { css as c, property as u, customElement as h, LitElement as p, html as o } from "@umbraco-cms/backoffice/external/lit";
var b = Object.defineProperty, f = Object.getOwnPropertyDescriptor, l = (e, t, i, n) => {
  for (var d = n > 1 ? void 0 : n ? f(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (d = (n ? a(t, i, d) : a(d)) || d);
  return n && d && b(t, i, d), d;
};
let s = class extends p {
  constructor() {
    super(...arguments), this.value = "[]", this.menuNodes = [], this.editingNodeId = null, this.editingNodeLabel = "", this.editingNodeUrl = "", this.showAddForm = !0, this.parentNodeId = null, this.newNodeLabel = "", this.newNodeUrl = "";
  }
  connectedCallback() {
    super.connectedCallback(), this.loadMenuNodes();
  }
  updated(e) {
    super.updated(e), e.has("value") && this.loadMenuNodes();
  }
  loadMenuNodes() {
    try {
      if (this.value && this.value !== "") {
        let e = typeof this.value == "string" ? JSON.parse(this.value) : this.value;
        Array.isArray(e) ? this.menuNodes = JSON.parse(JSON.stringify(e)) : this.menuNodes = [];
      } else
        this.menuNodes = [];
    } catch {
      this.menuNodes = [];
    }
  }
  saveMenuNodes() {
    this.value = JSON.stringify(this.menuNodes), this.dispatchEvent(new CustomEvent("change", { bubbles: !0, composed: !0 }));
  }
  generateId() {
    return `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  findNodeById(e, t) {
    for (const i of e) {
      if (i.id === t)
        return { node: i, parent: e };
      if (i.children) {
        const n = this.findNodeById(i.children, t);
        if (n) return n;
      }
    }
    return null;
  }
  addNode() {
    if (!this.newNodeLabel.trim()) return;
    const e = {
      id: this.generateId(),
      label: this.newNodeLabel.trim(),
      url: this.newNodeUrl.trim() || void 0,
      children: []
    };
    if (this.parentNodeId) {
      const t = this.findNodeById(this.menuNodes, this.parentNodeId);
      t && (t.node.children || (t.node.children = []), t.node.children.push(e));
    } else
      this.menuNodes.push(e);
    this.newNodeLabel = "", this.newNodeUrl = "", this.showAddForm = !1, this.parentNodeId = null, this.saveMenuNodes(), this.requestUpdate();
  }
  editNode(e) {
    const t = this.findNodeById(this.menuNodes, e);
    t && (this.editingNodeId = e, this.editingNodeLabel = t.node.label, this.editingNodeUrl = t.node.url || "", this.requestUpdate());
  }
  saveEdit() {
    if (!this.editingNodeLabel.trim() || !this.editingNodeId) return;
    const e = this.findNodeById(this.menuNodes, this.editingNodeId);
    e && (e.node.label = this.editingNodeLabel.trim(), e.node.url = this.editingNodeUrl.trim() || void 0), this.editingNodeId = null, this.editingNodeLabel = "", this.editingNodeUrl = "", this.saveMenuNodes(), this.requestUpdate();
  }
  cancelEdit() {
    this.editingNodeId = null, this.editingNodeLabel = "", this.editingNodeUrl = "", this.requestUpdate();
  }
  deleteNode(e) {
    if (confirm("Are you sure you want to delete this node and all its children?")) {
      const t = this.findNodeById(this.menuNodes, e);
      if (t) {
        const i = t.parent.indexOf(t.node);
        i > -1 && t.parent.splice(i, 1);
      }
      this.saveMenuNodes(), this.requestUpdate();
    }
  }
  startAddChild(e) {
    this.parentNodeId = e, this.showAddForm = !0, this.newNodeLabel = "", this.newNodeUrl = "", this.requestUpdate();
  }
  cancelAdd() {
    this.showAddForm = !1, this.parentNodeId = null, this.newNodeLabel = "", this.newNodeUrl = "", this.requestUpdate();
  }
  renderNode(e, t = 0) {
    const i = this.editingNodeId === e.id, n = `margin-left: ${t * 30}px`;
    return o`
            <div class="menu-node" style=${n}>
                <div class="node-content">
                    ${i ? o`
                        <div class="edit-form">
                            <input 
                                type="text" 
                                .value=${this.editingNodeLabel}
                                @input=${(d) => this.editingNodeLabel = d.target.value}
                                placeholder="Label"
                                class="edit-input"
                            />
                            <input 
                                type="text" 
                                .value=${this.editingNodeUrl}
                                @input=${(d) => this.editingNodeUrl = d.target.value}
                                placeholder="URL (optional)"
                                class="edit-input"
                            />
                            <button @click=${() => this.saveEdit()} class="btn btn-save">Save</button>
                            <button @click=${() => this.cancelEdit()} class="btn btn-cancel">Cancel</button>
                        </div>
                    ` : o`
                        <div class="node-info">
                            <span class="node-label">${e.label}</span>
                            ${e.url ? o`<span class="node-url">${e.url}</span>` : ""}
                        </div>
                        <div class="node-actions">
                            <button @click=${() => this.editNode(e.id)} class="btn btn-edit" title="Edit">✏️</button>
                            <button @click=${() => this.startAddChild(e.id)} class="btn btn-add-child" title="Add Child">➕</button>
                            <button @click=${() => this.deleteNode(e.id)} class="btn btn-delete" title="Delete">🗑️</button>
                        </div>
                    `}
                </div>
                ${e.children && e.children.length > 0 ? o`
                    <div class="children">
                        ${e.children.map((d) => this.renderNode(d, t + 1))}
                    </div>
                ` : ""}
                ${this.parentNodeId === e.id && this.showAddForm ? o`
                    <div class="add-form" style=${n}>
                        <input 
                            type="text" 
                            .value=${this.newNodeLabel}
                            @input=${(d) => this.newNodeLabel = d.target.value}
                            placeholder="Child Node Label"
                            class="add-input"
                        />
                        <input 
                            type="text" 
                            .value=${this.newNodeUrl}
                            @input=${(d) => this.newNodeUrl = d.target.value}
                            placeholder="URL (optional)"
                            class="add-input"
                        />
                        <button @click=${() => this.addNode()} class="btn btn-add">Add</button>
                        <button @click=${() => this.cancelAdd()} class="btn btn-cancel">Cancel</button>
                    </div>
                ` : ""}
            </div>
        `;
  }
  render() {
    return o`
            <div class="menu-control">
                <div class="menu-header">
                    <h3>Menu Structure</h3>
                    ${!this.showAddForm || this.parentNodeId ? "" : o`
                        <button @click=${() => {
      this.showAddForm = !0, this.parentNodeId = null, this.requestUpdate();
    }} class="btn btn-primary">
                            Add Root Node
                        </button>
                    `}
                </div>
                ${this.showAddForm && !this.parentNodeId ? o`
                    <div class="add-form root-add-form">
                        <input 
                            type="text" 
                            .value=${this.newNodeLabel}
                            @input=${(e) => this.newNodeLabel = e.target.value}
                            placeholder="Node Label"
                            class="add-input"
                        />
                        <input 
                            type="text" 
                            .value=${this.newNodeUrl}
                            @input=${(e) => this.newNodeUrl = e.target.value}
                            placeholder="URL (optional)"
                            class="add-input"
                        />
                        <button @click=${() => this.addNode()} class="btn btn-add">Add Node</button>
                        <button @click=${() => this.cancelAdd()} class="btn btn-cancel">Cancel</button>
                    </div>
                ` : ""}
                <div class="menu-nodes">
                    ${this.menuNodes.length === 0 && !this.showAddForm ? o`
                        <div class="empty-state">
                            <p>No menu nodes yet. Click "Add Root Node" to get started.</p>
                        </div>
                    ` : ""}
                    ${this.menuNodes.map((e) => this.renderNode(e))}
                </div>
            </div>
        `;
  }
};
s.styles = c`
        :host {
            display: block;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .menu-control {
            padding: 20px;
            background: #ffffff;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
        }

        .menu-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid #f0f0f0;
        }

        .menu-header h3 {
            margin: 0;
            font-size: 18px;
            font-weight: 600;
            color: #333;
        }

        .menu-nodes {
            min-height: 50px;
        }

        .menu-node {
            margin-bottom: 10px;
            border-left: 3px solid #0073aa;
            padding-left: 15px;
        }

        .node-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #f9f9f9;
            padding: 12px 15px;
            border-radius: 6px;
            margin-bottom: 8px;
        }

        .node-info {
            display: flex;
            flex-direction: column;
            flex: 1;
            gap: 4px;
        }

        .node-label {
            font-weight: 600;
            color: #333;
            font-size: 14px;
        }

        .node-url {
            font-size: 12px;
            color: #666;
            font-style: italic;
        }

        .node-actions {
            display: flex;
            gap: 8px;
        }

        .btn {
            padding: 6px 12px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            transition: all 0.2s ease;
            background: transparent;
            border: 1px solid transparent;
        }

        .btn:hover {
            transform: translateY(-1px);
        }

        .btn-edit {
            background: #fff3cd;
            color: #856404;
            border-color: #ffeaa7;
        }

        .btn-edit:hover {
            background: #ffeaa7;
        }

        .btn-add-child {
            background: #d1ecf1;
            color: #0c5460;
            border-color: #bee5eb;
        }

        .btn-add-child:hover {
            background: #bee5eb;
        }

        .btn-delete {
            background: #f8d7da;
            color: #721c24;
            border-color: #f5c6cb;
        }

        .btn-delete:hover {
            background: #f5c6cb;
        }

        .btn-primary {
            background: #0073aa;
            color: white;
            border-color: #005177;
        }

        .btn-primary:hover {
            background: #005177;
        }

        .btn-add {
            background: #28a745;
            color: white;
            border-color: #218838;
        }

        .btn-add:hover {
            background: #218838;
        }

        .btn-save {
            background: #28a745;
            color: white;
            border-color: #218838;
        }

        .btn-save:hover {
            background: #218838;
        }

        .btn-cancel {
            background: #6c757d;
            color: white;
            border-color: #5a6268;
        }

        .btn-cancel:hover {
            background: #5a6268;
        }

        .edit-form,
        .add-form {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 15px;
            background: #fff;
            border: 2px solid #0073aa;
            border-radius: 6px;
            margin-bottom: 10px;
        }

        .root-add-form {
            margin-bottom: 20px;
        }

        .edit-input,
        .add-input {
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
            font-family: inherit;
        }

        .edit-input:focus,
        .add-input:focus {
            outline: none;
            border-color: #0073aa;
            box-shadow: 0 0 0 2px rgba(0, 115, 170, 0.1);
        }

        .edit-form {
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
        }

        .edit-form .edit-input {
            flex: 1;
            min-width: 150px;
        }

        .add-form {
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
        }

        .add-form .add-input {
            flex: 1;
            min-width: 150px;
        }

        .children {
            margin-top: 5px;
        }

        .empty-state {
            text-align: center;
            padding: 40px 20px;
            color: #999;
            font-style: italic;
        }

        .empty-state p {
            margin: 0;
        }
    `;
l([
  u({ type: String })
], s.prototype, "value", 2);
s = l([
  h("my-menu-property-editor-ui")
], s);
export {
  s as default
};
//# sourceMappingURL=umbracomenu.js.map
