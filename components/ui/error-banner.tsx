export default function ErrorBanner() {
  return (
    <div className="mx-auto flex items-center justify-center bg-red-600 px-6 py-2.5 text-center">
      <p className="text-sm leading-6 text-white">
        <strong className="font-semibold">
          We're experiencing some issues with generating summaries and action
          items. Please check back in a few hours.
        </strong>
      </p>
    </div>
  );
}
