# TypeScript Next.js example

This is a really simple project that shows the usage of Next.js with TypeScript.

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) or preview live with [StackBlitz](https://stackblitz.com/github/vercel/next.js/tree/canary/examples/with-typescript)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-typescript&project-name=with-typescript&repository-name=with-typescript)

## How to use it?

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example with-typescript with-typescript-app
```

```bash
yarn create next-app --example with-typescript with-typescript-app
```

```bash
pnpm create next-app --example with-typescript with-typescript-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

## Notes

This example shows how to integrate the TypeScript type system into Next.js. Since TypeScript is supported out of the box with Next.js, all we have to do is to install TypeScript.

```
npm install --save-dev typescript
```

To enable TypeScript's features, we install the type declarations for React and Node.

```
npm install --save-dev @types/react @types/react-dom @types/node
```

When we run `next dev` the next time, Next.js will start looking for any `.ts` or `.tsx` files in our project and builds it. It even automatically creates a `tsconfig.json` file for our project with the recommended settings.

Next.js has built-in TypeScript declarations, so we'll get autocompletion for Next.js' modules straight away.

A `type-check` script is also added to `package.json`, which runs TypeScript's `tsc` CLI in `noEmit` mode to run type-checking separately. You can then include this, for example, in your `test` scripts.

# Local Kubernetes Setup
Dependencies: Minikube, Docker, Kubectl
- Relevant Links:
	- Minikube (https://minikube.sigs.k8s.io/docs/start/)
		- Use Docker Driver (https://minikube.sigs.k8s.io/docs/drivers/docker/)
	- Kubectl (https://kubernetes.io/docs/tasks/tools/)
Steps to Setup Project:
1. Start Minikube in cmd
	- Run `minikube start`
2. Ensure Metrics-Server is enabled in Minikube
	- Run ` minikube addons enable metrics-server`
3. Change directory to: `/development/kube_developement`
	- Ensure config.yaml and secret.yaml is in this directory
4. Run `sh ../start.sh`
5. Verify that all deployments are running 
	- `kubectl get all -n eks-peerprep`
6. Run `minikube service gateway-service -n eks-peerprep` 
