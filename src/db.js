import Kinto from 'kinto'

const kinto = new Kinto()

const stickyNotes = kinto.collection('sticky-notes')

export const listStickyNotes = () => {
  return stickyNotes.list().then(({ data }) => data)
}

export const addStickyNote = (obj) => {
  return stickyNotes.create(obj)
}

export const deleteStickyNote = (id) => {
  return stickyNotes.delete(id)
}
