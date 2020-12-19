type DtoHelper<P> = { [key in keyof P]: string };
export default DtoHelper;
