type Props = {
  title: string;
  type: string;
  description: string;
  url: string;
  tech: Array<string>;
};

export function Project({ title, description, url, tech }: Props) {
  return (
    <>
      <h1>{title}</h1>
    </>
  );
}
