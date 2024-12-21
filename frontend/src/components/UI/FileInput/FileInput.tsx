import React, {useRef} from 'react';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  filename: string;
}

const FileInput: React.FC<Props> = ({onChange, name, label, filename}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange(e);
    }
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        style={{display: 'none'}}
        type="file"
        name={name}
        onChange={onFileChange}
        ref={inputRef}
      />
      <div className="container mt-4">
        <div className="row align-items-center justify-content-evenly">
          <div className="col-md-9">
            <input
              type="text"
              className="form-control"
              disabled
              value={filename}
              placeholder={label}
            />
          </div>
          <div className="col-md-3">
            <button type="button" className="btn btn-primary" onClick={activateInput}>
              Browse
            </button>
          </div>
        </div>
        <input
          type="file"
          id="fileInput"
          style={{display: "none"}}
          onChange={activateInput}
        />
      </div>
    </>
  );
};

export default FileInput;