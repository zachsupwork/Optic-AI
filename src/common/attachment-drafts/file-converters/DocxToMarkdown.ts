import { convertToHtml, images } from 'mammoth';

export async function convertDocxToHTML(input: ArrayBuffer): Promise<{ html: string }> {
  try {
    console.log('input=====', input);
    // Dynamically import mammoth
    const result = await convertToHtml(
      { arrayBuffer: input },
      {
        convertImage: images.imgElement(function ignoreImage(image) {
          throw new Error('Images are not supported in DOCX to Markdown conversion');
        }),
      },
    );
    if (result.messages?.length) {
      console.log('Messages from DOCX to Markdown conversion:', result.messages);
    }
    console.log('result.value====', result.value);
    return {
      html: result.value,
    };
  } catch (error) {
    console.error('Error converting DOCX to Markdown:', error);
    throw error;
  }
}
