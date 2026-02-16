const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <h1 className="text-2xl font-bold text-foreground mb-2">{title}</h1>
    <p className="text-muted-foreground text-sm">This section is coming soon.</p>
  </div>
);

export default PlaceholderPage;
