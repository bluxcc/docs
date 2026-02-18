import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    githubUrl:"https://github.com/bluxcc",
    nav: {
      title: (
      <>
          <img
            src="/whiteBlux.svg"
            alt="Blux"
            className="logo-dark"
            style={{ height: '32px', width: 'auto' }}
          />
          <img
            src="/blux.svg"
            alt="Blux"
            className="logo-light"
            style={{ height: '32px', width: 'auto' }}
          />
        </>
      ),
      
    },
  };
}
