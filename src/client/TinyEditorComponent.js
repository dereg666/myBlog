import React, { Component } from 'react';
import tinymce from 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/table';

class TinyEditorComponent extends Component {
  constructor() {
    super();
    this.state = {editor: null };
    this.reset = this.reset.bind(this);
  }
  componentDidMount() {
    tinymce.init({
      content: '',
      selector: `#${this.props.id}`,
      skin_url: `${process.env.PUBLIC_URL}/skins/lightgray`,
      plugins: [
        "advlist autolink link image lists charmap print preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
        "table contextmenu directionality emoticons template textcolor paste fullpage textcolor colorpicker textpattern"
      ],
      toolbar1: "bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | forecolor backcolor | fontselect fontsizeselect",
      toolbar2: "hr removeformat | subscript superscript | charmap emoticons | undo redo | link unlink image media code",
      resize: false,
      height: "500",
      width: "1000",
      
      setup: editor => {
        this.setState({ editor });
        editor.on('keyup change', () => {
          const content = editor.getContent();
          this.props.onEditorChange(content);
        });
      }
    });
  }
  componentWillUnmount() {
    tinymce.remove(this.state.editor);
  }
  reset() {
    tinymce.get(this.props.id).setContent('');
    tinymce.activeEditor.windowManager.close(this);
  }

  render() {
    return (
      <textarea
        id={this.props.id}
        value={this.props.content}
        onChange={e => console.log(e)}
      />
    );
  }
}

export default TinyEditorComponent;
