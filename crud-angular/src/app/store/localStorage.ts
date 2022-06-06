export const getThisState = (stateName: string) => {
  try{
    const serializedState = localStorage.getItem(stateName);
    if(serializedState === null){ return undefined }
    return JSON.parse(serializedState);
  }catch(err){
    return undefined
  }
}

export const getItem = (itemName: string) => {
  const items = getThisState(itemName)
  if (items === undefined) {
    return {all : []}
  } else {
    return items
  }
}
