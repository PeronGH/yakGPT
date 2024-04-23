import { IconCopy, IconCopyCheck } from "@tabler/icons-react";
import { ActionIcon, Code, CopyButton, createStyles } from "@mantine/core";
import { FunctionComponent, ReactNode, useMemo } from "react";
import { collectNodeText, SimpleNode } from "@/stores/utils";

const useStyles = createStyles(() => ({
  container: {
    position: "relative",
  },
  icons: {
    position: "absolute",
    right: 6,
    top: 6,
    zIndex: 1,
  },
}));

export interface Props {
  node?: SimpleNode;
  className?: string;
  children?: ReactNode;
}

const CodeComponent: FunctionComponent<Props> = (
  { node, children, className },
) => {
  const { classes } = useStyles();

  const content = useMemo(
    () => node ? collectNodeText(node) : "",
    [node],
  );

  if (!className?.includes("language-")) {
    return <Code className={className}>{children}</Code>;
  }

  return (
    <div className={classes.container}>
      <div className={classes.icons}>
        <CopyButton value={content}>
          {({ copied, copy }) => (
            <ActionIcon
              onClick={copy}
              color="gray"
              size="sm"
              variant="transparent"
            >
              {copied ? <IconCopyCheck /> : <IconCopy />}
            </ActionIcon>
          )}
        </CopyButton>
      </div>
      <Code
        className={className}
        style={{
          paddingRight: 36,
        }}
      >
        {children}
      </Code>
    </div>
  );
};

export default CodeComponent;
