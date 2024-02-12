import { Preloaded, useConvexAuth, usePreloadedQuery } from 'convex/react';
import { FunctionReference, FunctionReturnType } from 'convex/server';
import { cloneElement, useRef, useCallback } from 'react';

interface AuthenticatedPreloadProps<
  P extends Preloaded<FunctionReference<'query'>>,
> {
  children: React.ReactElement<{ preloaded: FunctionReturnType<P['__type']> }>;
  preload: P;
}

const AuthenticatedPreload = <P extends Preloaded<FunctionReference<'query'>>>({
  children,
  preload,
}: AuthenticatedPreloadProps<P>) => {
  const { isAuthenticated } = useConvexAuth();
  const output = useRef();
  const useHook = output.current === undefined || isAuthenticated;

  const HookComponent = useCallback(
    ({
      children,
    }: {
      children: React.ReactElement<{
        preloaded: FunctionReturnType<P['__type']>;
      }>;
    }) => {
      output.current = usePreloadedQuery(preload);
      return cloneElement(children, { preloaded: output.current });
    },
    [],
  );

  return useHook ? (
    <HookComponent>{children}</HookComponent>
  ) : (
    cloneElement(children, { preloaded: output.current })
  );
};

export default AuthenticatedPreload;
