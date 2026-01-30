"use client";

import {
  useDeployConfigMutation,
  useDeploymentStatusRQ,
  useDeploymentStatusUpdateRQ,
  useDeviceByIdRQ,
} from "@/app/_lib/_react-query-hooks/device/useDevicesRQ";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

// Status constants - match backend deployment service
export const DEPLOY_STATUS = {
  PENDING: "pending",
  SENT: "sent",
  SAVED: "applied",
  ERROR: "error",
} as const;

type DeployStatus = (typeof DEPLOY_STATUS)[keyof typeof DEPLOY_STATUS];

interface Props {
  deviceId: string;
  deviceName: string;
  lastUpdated?: string;
  onClose?: () => void;
}

export function DeployConfigStatus({
  deviceId,
  deviceName,
  lastUpdated,
  onClose,
}: Props) {
  const [status, setStatus] = useState<DeployStatus | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isDeploying, setIsDeploying] = useState(false);

  // This flag determines if we should poll for status updates, based on current status
  const fetchStatusEnabled =
    (isDeploying && status === DEPLOY_STATUS.PENDING) ||
    status === DEPLOY_STATUS.SENT;

  const { data: deployStatusData } = useDeploymentStatusRQ(
    deviceId,
    fetchStatusEnabled,
  );
  const { data: device } = useDeviceByIdRQ(deviceId);
  const { mutate: deployConfigMutation } = useDeployConfigMutation(deviceId);
  const { mutate: updateDeploymentStatus } =
    useDeploymentStatusUpdateRQ(deviceId);

  // Update local status based on backend response
  useEffect(() => {
    if (deployStatusData?.status) {
      setStatus(deployStatusData.status);
      setErrorMessage(deployStatusData.message);

      // Stop polling when completed
      if (
        deployStatusData.status === DEPLOY_STATUS.SAVED ||
        deployStatusData.status === DEPLOY_STATUS.ERROR
      ) {
        updateDeploymentStatus({
          status: DEPLOY_STATUS.PENDING,
          configId: device?.configId,
          message: "waiting for deployment",
        });
        setIsDeploying(false);
      }
    }
  }, [deployStatusData?.status]);

  const handleDeploy = async () => {
    setIsDeploying(true);
    setStatus(DEPLOY_STATUS.PENDING);
    setErrorMessage(undefined);

    try {
      await deployConfigMutation();
      // Status will be updated via polling
      setTimeout(() => {
        // Stop polling after 60 seconds if no update
        setIsDeploying(false);
      }, 30000);
    } catch (error) {
      console.error("Deploy error:", error);
      setStatus(DEPLOY_STATUS.ERROR);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to initiate deployment",
      );
      setIsDeploying(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Body */}
      <div className="flex-1 py-4 space-y-4 overflow-y-auto">
        {/* Steps */}
        {/* Steps - only show when deployment has started */}
        {status && (
          <ul className="steps steps-vertical text-sm">
            <li
              className={`step ${status !== DEPLOY_STATUS.PENDING ? "step-primary" : "step-primary"}`}
            >
              Pending
            </li>
            <li
              className={`step ${status === DEPLOY_STATUS.SENT || status === DEPLOY_STATUS.SAVED ? "step-primary" : ""}`}
            >
              Config Sent
            </li>
            <li
              className={`step ${status === DEPLOY_STATUS.SAVED ? "step-primary" : ""}`}
            >
              Saved Config
            </li>
          </ul>
        )}

        {/* Status box */}
        <StatusBox
          status={status}
          isLoading={isDeploying}
          errorMessage={errorMessage}
        />

        {/* Meta */}
        <div className="text-xs text-base-content/60 pt-2">
          Last updated:
          <div className="font-medium">{lastUpdated ?? "—"}</div>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t space-y-2">
        <button
          className="btn btn-primary btn-sm w-full"
          onClick={handleDeploy}
          disabled={isDeploying}
        >
          {isDeploying ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Deploying...
            </>
          ) : (
            "Deploy Configuration"
          )}
        </button>

        <button
          className="btn btn-outline btn-sm w-full"
          onClick={onClose}
          disabled={isDeploying}
        >
          Close
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------- */

function StatusBox({
  status,
  isLoading,
  errorMessage,
}: {
  status: DeployStatus | undefined;
  isLoading: boolean;
  errorMessage?: string;
}) {
  // Show initial state when no deployment has been initiated
  if (!status) {
    return (
      <div className="alert alert-warning text-sm">
        <CheckCircle className="w-4 h-4" />
        <div>
          <p className="font-medium">Ready to Deploy</p>
          <p className="text-xs">
            Click Deploy Configuration to send configuration to device.
          </p>
        </div>
      </div>
    );
  }

  if (status === DEPLOY_STATUS.PENDING) {
    return (
      <div className="alert alert-info text-sm">
        <Loader2 className="w-4 h-4 animate-spin" />
        <div>
          <p className="font-medium">Initializing Deployment</p>
          <p className="text-xs">Preparing configuration for device...</p>
        </div>
      </div>
    );
  }

  if (status === DEPLOY_STATUS.SENT) {
    return (
      <div
        className={`alert ${isLoading ? "alert-info" : "alert-warning"} text-sm`}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <CheckCircle className="w-4 h-4" />
        )}
        <div>
          <p className="font-medium">
            {isLoading ? "Deploying Configuration" : "Config Sent"}
          </p>
          <p className="text-xs">
            {isLoading
              ? "Configuration is being applied to the device..."
              : "Configuration sent to device. Waiting for device response."}
          </p>
        </div>
      </div>
    );
  }

  if (status === DEPLOY_STATUS.SAVED) {
    return (
      <div className="alert alert-success text-sm">
        <CheckCircle className="w-4 h-4" />
        <div>
          <p className="font-medium">Configuration Saved</p>
          <p className="text-xs">
            Configuration has been applied and saved to device.
          </p>
        </div>
      </div>
    );
  }

  if (status === DEPLOY_STATUS.ERROR) {
    return (
      <div className="alert alert-error text-sm">
        <AlertCircle className="w-4 h-4" />
        <div>
          <p className="font-medium">Deployment Failed</p>
          <p className="text-xs">
            {errorMessage || "An error occurred during deployment."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="alert alert-info text-sm">
      <Loader2 className="w-4 h-4 animate-spin" />
      <div>
        <p className="font-medium">Processing</p>
        <p className="text-xs">Processing deployment...</p>
      </div>
    </div>
  );
}

/*
 * ============================================
 * COMPONENT HOOKS
 * ============================================
 *
 * This component uses the following custom hooks:
 *
 * 1. useDeploymentStatusRQ(deviceId, enabled)
 *    - Polls for current deployment status
 *    - Only polls when enabled is true
 *    - Interval: 1000ms while deploying
 *
 * 2. useDeployConfigMutation(deviceId)
 *    - Initiates device configuration deployment
 *    - Handles error messages and toast notifications
 *
 * See useDevicesRQ.ts for hook implementations
 */
