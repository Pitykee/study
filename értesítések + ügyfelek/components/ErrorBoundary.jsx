import { Component } from 'react';

// Ha egy feladat összeomlik, csak az a rész lesz piros, a többi fül működik tovább.
export default class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div className="alert alert-danger">
          <strong>Összeomlott a komponens:</strong> {this.state.error.message}
          <div className="small mt-2">Nézd meg a Console fület (F12) – ott látod a fájlt és a sort is.</div>
        </div>
      );
    }
    return this.props.children;
  }
}
