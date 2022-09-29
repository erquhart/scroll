import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { useEditor, EditorContent, Extension } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { array, either, readonlyArray } from "fp-ts";
import { identity, pipe } from "fp-ts/lib/function";
import * as collab from "prosemirror-collab";
import { Step } from "prosemirror-transform";
import { useEffect } from "react";
import { match, P } from "ts-pattern";
import { Document } from "../convex/_generated/dataModel";
import { useMutation, useQuery } from "../convex/_generated/react";

const Editor = (props: {
  doc: Document<"note">["doc"];
  persistedVersion: number;
}) => {
  const content = pipe(
    either.tryCatch(
      () => JSON.parse(props.doc),
      () => "<p>Hello world</p>"
    ),
    either.matchW(identity, identity)
  );

  const updateNote = useMutation("updateNote");
  const handleOnUpdate = async (
    clientId: string,
    version: number,
    steps: string[]
  ) => await updateNote(clientId, version, steps);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Extension.create({
        addProseMirrorPlugins: () => [
          collab.collab({ version: props.persistedVersion }),
        ],
      }),
      Placeholder.configure({
        placeholder: "Write something…",
        emptyNodeClass:
          "first:before:h-0 first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none",
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: "h-screen w-screen cursor-text p-5 focus:outline-none",
      },
    },
    onTransaction(props) {
      const sendableSteps = collab.sendableSteps(props.editor.state);
      console.log("sendableSteps", sendableSteps);
      if (sendableSteps) {
        handleOnUpdate(
          match(sendableSteps.clientID)
            .with(P.number, (clientId) => clientId.toString())
            .with(P.string, identity)
            .exhaustive(),
          sendableSteps.version,
          pipe(
            sendableSteps.steps,
            readonlyArray.toArray,
            array.map((step: Step) => JSON.stringify(step.toJSON()))
          )
        );
      }
    },
  });

  const stepsSince = useQuery(
    "getStepsSince",
    editor ? collab.getVersion(editor.state) : props.persistedVersion
  );

  useEffect(() => {
    console.log("stepsSince", stepsSince);
    if (editor && stepsSince) {
      const steps = array.map<string, Step>((step) =>
        Step.fromJSON(editor.schema, JSON.parse(step))
      )(stepsSince.steps);

      editor.view.dispatch(
        collab.receiveTransaction(editor.state, steps, stepsSince.clientIds, {
          mapSelectionBackward: true,
        })
      );
    }
  }, [editor, stepsSince]);

  return <EditorContent editor={editor} />;
};

export default Editor;
