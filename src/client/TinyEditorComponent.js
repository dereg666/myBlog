import React, { Component } from 'react';
import tinymce from 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/table';

class TinyEditorComponent extends Component {
  constructor() {
    super();
    this.state = {editor: null };
  }
  componentDidMount() {
    tinymce.init({
      selector: `#${this.props.id}`,
      skin_url: `${process.env.PUBLIC_URL}/skins/lightgray`,
      plugins: [
    "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak",
    "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
    "table contextmenu directionality emoticons template textcolor paste fullpage textcolor colorpicker textpattern"
  ],
      toolbar1: "newdocument fullpage | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
  toolbar2: "cut copy paste | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media code | insertdatetime preview | forecolor backcolor",
  toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons | print fullscreen | ltr rtl | visualchars visualblocks nonbreaking template pagebreak restoredraft",
      resize: false,
      height: "500",
      width: "800",
      
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
