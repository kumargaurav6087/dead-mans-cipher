export interface AttackSimulationProgress {
  attempts: number;
  status: 'running' | 'completed' | 'failed';
}
