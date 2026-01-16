import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="app-layout">
      <header class="glass-panel header">
        <div class="logo">
          <span class="text-gradient">CI/CD Demo</span>
        </div>
      </header>

      <main class="container">
        <section class="hero">
          <h1 class="hero-title">
            Welcome to <span class="text-gradient">{{ title() }}</span>
          </h1>
          <p class="hero-subtitle">A modern frontend connected to a robust ASP.NET Core backend.</p>
        </section>

        <section class="status-card glass-panel">
          <h2 class="card-title">System Status</h2>
          <div class="status-indicator">
            <span class="label">Backend Connection:</span>
            <div class="response-box" [class.loading]="backendResponse() === 'loading...'">
              {{ backendResponse() }}
            </div>
          </div>
        </section>

        <router-outlet />
      </main>

      <footer class="footer">
        <p>&copy; 2026 Demo Project</p>
      </footer>
    </div>
  `,
  styles: [
    `
      .app-layout {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      .header {
        padding: 1rem 2rem;
        position: sticky;
        top: 1rem;
        margin: 0 1rem;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .logo {
        font-family: var(--font-heading);
        font-weight: 700;
        font-size: 1.5rem;
      }

      .hero {
        text-align: center;
        padding: 4rem 0;
      }

      .hero-title {
        font-family: var(--font-heading);
        font-size: 3.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
        line-height: 1.2;
      }

      .hero-subtitle {
        font-size: 1.25rem;
        color: var(--text-secondary);
        max-width: 600px;
        margin: 0 auto;
      }

      .status-card {
        max-width: 600px;
        margin: 0 auto;
        padding: 2rem;
      }

      .card-title {
        font-family: var(--font-heading);
        margin-bottom: 1.5rem;
        font-size: 1.5rem;
      }

      .status-indicator {
        display: flex;
        align-items: center;
        gap: 1rem;
        background: rgba(0, 0, 0, 0.2);
        padding: 1rem;
        border-radius: 0.5rem;
      }

      .label {
        font-weight: 600;
        color: var(--text-secondary);
      }

      .response-box {
        font-family: monospace;
        font-size: 1.1rem;
        color: #4ade80; /* Green for success */
      }

      .response-box.loading {
        color: var(--accent-secondary);
        animation: pulse 1.5s infinite;
      }

      .footer {
        margin-top: auto;
        padding: 2rem;
        text-align: center;
        color: var(--text-secondary);
        font-size: 0.875rem;
      }

      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }
    `,
  ],
})
export class App implements OnInit {
  protected readonly title = signal('angular');
  protected readonly backendResponse = signal<string>('loading...');
  private readonly http = inject(HttpClient);

  ngOnInit() {
    this.http.get('http://localhost:5164/ping', { responseType: 'text' }).subscribe({
      next: (response) => this.backendResponse.set(response),
      error: (err) => this.backendResponse.set('Error fetching data: ' + err.message),
    });
  }
}
