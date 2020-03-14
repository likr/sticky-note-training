import Kinto from 'kinto'

const kinto = new Kinto()

const stickyNotes = kinto.collection('sticky-notes')

export const listStickyNotes = () => {
  return stickyNotes.list({ order: '-updated' }).then(({ data }) => data)
}

export const addStickyNote = (obj) => {
  const now = new Date()
  return stickyNotes.create(
    Object.assign(obj, {
      created: now,
      updated: now
    })
  )
}

export const deleteStickyNote = (id) => {
  return stickyNotes.delete(id)
}
