import { property as i, customElement as m, LitElement as a, html as v } from "@umbraco-cms/backoffice/external/lit";
var y = Object.defineProperty, f = Object.getOwnPropertyDescriptor, l = (u, r, o, t) => {
  for (var e = t > 1 ? void 0 : t ? f(r, o) : r, p = u.length - 1, s; p >= 0; p--)
    (s = u[p]) && (e = (t ? s(r, o, e) : s(e)) || e);
  return t && e && y(r, o, e), e;
};
let n = class extends a {
  constructor() {
    super(...arguments), this.value = "";
  }
  render() {
    return v`I'm a property editor!`;
  }
};
l([
  i({ type: String })
], n.prototype, "value", 2);
n = l([
  m("my-suggestions-property-editor-ui")
], n);
export {
  n as default
};
//# sourceMappingURL=umbracomenu.js.map
