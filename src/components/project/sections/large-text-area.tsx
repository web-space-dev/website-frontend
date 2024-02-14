interface IProps {
  text: string;
}

export default function LargeTextArea({ text }: IProps) {
  return (
    <div>
      <p>{text}</p>
    </div>
  );
}
