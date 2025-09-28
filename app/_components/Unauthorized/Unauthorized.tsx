"use client";

export function Unauthorized() {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error text-2xl font-bold">
            Unauthorized
          </h2>
          <p className="text-base-content/70 mt-2">
            You are not authorized to view this page.
          </p>
          <p className="text-base-content/70 mb-4">
            Please select an option from your dashboard.
          </p>
          <div className="card-actions">
            <a href="/dashboard" className="btn btn-primary">
              Go to Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
