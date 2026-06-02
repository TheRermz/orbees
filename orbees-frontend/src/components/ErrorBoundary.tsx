import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            gap: 16,
            backgroundColor: "#f5f5f5",
          }}
        >
          <p style={{ color: "#ef4444", fontWeight: 600, fontSize: "0.95rem" }}>
            Algo deu errado. Recarregue a página.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{
              padding: "10px 20px",
              border: "1px solid #dddddd",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: "0.95rem",
              backgroundColor: "#ffffff",
            }}
          >
            Tentar novamente
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
