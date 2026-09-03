import { metadataprop } from "../types/types";
const Metadata = ({
  title,
  desc,
  classname,
}: metadataprop) => {
  return (
    <div className={classname}>
      <h1 className="text-2xl font-bold">
        {title}
      </h1>

      <p className="truncate text-sm text-muted-foreground">
        {desc}
      </p>
    </div>
  );
};

export default Metadata;