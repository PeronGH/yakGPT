import { IconCopy, IconCopyCheck } from "@tabler/icons-react";
import { ActionIcon, Code, CopyButton, createStyles } from "@mantine/core";
import { FunctionComponent } from "react";
import { collectNodeText } from "@/stores/utils";

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

// TODO: Fix any type
const CodeComponent: FunctionComponent<any> = (props) => {
  const { classes } = useStyles();

  const content = collectNodeText(props.node);

  if (!props.className?.includes("language-")) {
    return <Code {...props} />;
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
        {...props}
        style={{
          paddingRight: 36,
        }}
      />
    </div>
  );
};

export default CodeComponent;
