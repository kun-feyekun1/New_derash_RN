import { Component, type ErrorInfo, type PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import { logger } from '@/services/logging/logger';
import { spacing } from '@/theme';

import { AppText } from './AppText';
import { PrimaryButton } from './PrimaryButton';

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<PropsWithChildren, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    logger.error('Unhandled UI error', { error: error.message, componentStack: info.componentStack });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.wrap}>
          <AppText variant="subtitle" weight="700">
            Something went wrong
          </AppText>
          <AppText muted style={styles.center}>
            Derash could not load this view. Please retry.
          </AppText>
          <PrimaryButton label="Retry" onPress={() => this.setState({ hasError: false })} />
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md, padding: spacing.lg },
  center: { textAlign: 'center' }
});
