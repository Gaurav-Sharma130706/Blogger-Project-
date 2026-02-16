import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({name,control,label,defaultValue=""}){  //yeh 'control aata hai from react-hook-form and ye hi responsible hai iski(component) sari state vaghera ko uss form mai lejane ke liye
    return(
        <div className="w-full">
            {label && <label className="inline-block mb-1 pl-1 ">{label}</label>}

            <Controller
            name={name || "content"}
            control={control}                //yeh jo control hai vo dega parent element
            render={({field: {onChange}})=>(   //Render this when there is change in field
                <Editor
                    apiKey='bx5op9eldwnghzfcu5p6qgyk5dk9081lgm9dlrcui4b2gjo9'
                    initialValue={defaultValue}
                    init={{
                    initialValue: defaultValue,
                    height: 500,
                    menubar: true,
                    plugins: [
                    "image",
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                    "anchor",
                    ],
                    toolbar:
                    "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            onEditorChange={onChange}
        />
            )}
            />

        </div>
    )
}