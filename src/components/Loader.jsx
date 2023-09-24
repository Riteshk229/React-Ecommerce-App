import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
    return (
        <div className='app-spinner'>
            <CircularProgress size={60}/>
        </div>
      );
}
export default Loader;